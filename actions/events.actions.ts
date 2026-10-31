"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
    requireAuthenticatedUser,
} from "@/lib/auth/auth.service";

import {
    AuthenticationError,
} from "@/lib/auth/auth.errors";

import {
    createEventRecord,
    deleteEventRecord,
} from "@/lib/events/event.service";

import {
    validateCreateEvent,
} from "@/lib/events/event.validation";

import {
    uploadEventImage,
    deleteEventImage,
} from "@/lib/cloudinary";

export type CreateEventActionState = {
    status: "idle" | "error";
    message?: string;
    fieldErrors?: {
        title?: string;
        description?: string;
        location?: string;
        eventDate?: string;
        image?: string;
    };
};

export async function createEventAction(
    _previousState: CreateEventActionState,
    formData: FormData,
): Promise<CreateEventActionState> {
    let uploadedImage:
        | {
            url: string;
            publicId: string;
        }
        | undefined;

    try {
        const user = await requireAuthenticatedUser();

        const validation = validateCreateEvent(formData);

        if (!validation.success) {
            return {
                status: "error",
                message: "Please correct the highlighted fields.",
                fieldErrors: validation.errors,
            };
        }

        const imageValue = formData.get("image");

        const imageFile =
            imageValue instanceof File && imageValue.size > 0
                ? imageValue
                : null;

        if (imageFile) {
            uploadedImage = await uploadEventImage(imageFile);
        }

        await createEventRecord({
            ...validation.data,
            createdById: user.id,
            imageUrl: uploadedImage?.url,
            imagePublicId: uploadedImage?.publicId,
        });

        revalidatePath("/dashboard");
        revalidatePath("/dashboard/events");

    } catch (error) {
        // If the database operation fails after upload,
        // remove the uploaded asset to avoid orphaned files.
        if (uploadedImage?.publicId) {
            try {
                await deleteEventImage(uploadedImage.publicId);
            } catch (cleanupError) {
                console.error(
                    "Failed to clean up uploaded event image:",
                    cleanupError,
                );
            }
        }

        if (error instanceof AuthenticationError) {
            return {
                status: "error",
                message: "Your session has expired. Please sign in again.",
            };
        }

        console.error("Create event error:", error);

        return {
            status: "error",
            message:
                error instanceof Error &&
                    error.message === "Image uploads are not configured."
                    ? "Image uploads are currently unavailable. Remove the image or try again later."
                    : "We couldn't create your event. Please try again.",
        };
    }

    redirect("/dashboard/events?created=1");
}

export type DeleteEventActionResult =
    | { success: true }
    | { success: false; message: string };

export async function deleteEventAction(
    eventId: string,
): Promise<DeleteEventActionResult> {
    try {
        const user = await requireAuthenticatedUser();

        if (
            typeof eventId !== "string" ||
            !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
                eventId,
            )
        ) {
            return {
                success: false,
                message: "Invalid event reference.",
            };
        }

        const deletedEvent = await deleteEventRecord(
            eventId,
            user.id,
        );

        if (!deletedEvent) {
            return {
                success: false,
                message: "Event not found or you don't have permission to delete it.",
            };
        }

        // The database deletion cascades to invitations and RSVPs.
        // Cloudinary deletion is separate from the database transaction.
        if (deletedEvent.imagePublicId) {
            try {
                await deleteEventImage(deletedEvent.imagePublicId);
            } catch (imageError) {
                console.error(
                    "Event deleted, but image cleanup failed:",
                    imageError,
                );
            }
        }

        revalidatePath("/dashboard");
        revalidatePath("/dashboard/events");

        return { success: true };
    } catch (error) {
        if (error instanceof AuthenticationError) {
            return {
                success: false,
                message: "Your session has expired. Please sign in again.",
            };
        }

        console.error("Delete event error:", error);

        return {
            success: false,
            message: "Unable to delete this event. Please try again.",
        };
    }
}