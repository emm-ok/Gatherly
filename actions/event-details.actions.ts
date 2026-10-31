
"use server";

import { revalidatePath } from "next/cache";
import { requireAuthenticatedUser } from "@/lib/auth/auth.service";
import {
    createEventInvitation,
    revokeEventInvitation,
} from "@/lib/events/event-invitation.service";

export interface CreateInvitationState {
    status: "idle" | "success" | "error";
    message: string;
    inviteUrl?: string;
    invitationId?: string;
}

export const initialInvitationState: CreateInvitationState = {
    status: "idle",
    message: "",
};

export async function createInvitationAction(
    _previousState: CreateInvitationState,
    formData: FormData,
): Promise<CreateInvitationState> {
    const eventId = formData.get("eventId");

    if (typeof eventId !== "string" || !eventId.trim()) {
        return {
            status: "error",
            message: "Invalid event.",
        };
    }

    try {
        const user = await requireAuthenticatedUser();

        const result = await createEventInvitation(
            user.id,
            eventId,
        );

        revalidatePath(`/dashboard/events/${eventId}`);

        return {
            status: "success",
            message: "Your invitation link is ready.",
            inviteUrl: result.inviteUrl,
            invitationId: result.invitation.id,
        };
    } catch (error) {
        console.error("Create invitation error:", error);

        return {
            status: "error",
            message: "We couldn't generate an invitation link. Please try again.",
        };
    }
}

export async function revokeInvitationAction(
    eventId: string,
    invitationId: string,
): Promise<{ success: boolean; message: string }> {
    try {
        const user = await requireAuthenticatedUser();

        await revokeEventInvitation(
            user.id,
            eventId,
            invitationId,
        );

        revalidatePath(`/dashboard/events/${eventId}`);

        return {
            success: true,
            message: "Invitation revoked successfully.",
        };
    } catch (error) {
        console.error("Revoke invitation error:", error);

        return {
            success: false,
            message: "We couldn't revoke this invitation. Please try again.",
        };
    }
}
