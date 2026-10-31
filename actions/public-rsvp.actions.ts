"use server";

import {
    submitPublicRSVP,
} from "@/lib/events/public-rsvp.service";

import {
    validatePublicRSVP,
} from "@/lib/events/public-rsvp.validation";

export interface PublicRSVPActionState {
    status: "idle" | "success" | "error";
    message: string;
    errors?: {
        name?: string;
        email?: string;
        status?: string;
        form?: string;
    };
    isUpdate?: boolean;
    responseStatus?: "GOING" | "MAYBE" | "NOT_GOING";
}

export async function submitPublicRSVPAction(
    _previousState: PublicRSVPActionState,
    formData: FormData,
): Promise<PublicRSVPActionState> {
    const validation = validatePublicRSVP(formData);

    if (!validation.success || !validation.data) {
        return {
            status: "error",
            message: "Please review the information you entered.",
            errors: validation.errors,
        };
    }

    try {
        const result = await submitPublicRSVP(validation.data);

        if (!result.success) {
            const messages = {
                INVALID: "This invitation link is invalid or unavailable.",
                REVOKED: "This invitation has been revoked by the event organizer.",
                EXPIRED: "This invitation has expired.",
                EVENT_ENDED: "This event has already taken place and is no longer accepting responses.",
            };

            return {
                status: "error",
                message: messages[result.reason],
                errors: {
                    form: messages[result.reason],
                },
            };
        }

        return {
            status: "success",
            message: result.isUpdate
                ? "Your RSVP has been updated successfully."
                : "Your RSVP has been submitted successfully.",
            isUpdate: result.isUpdate,
            responseStatus: result.status,
        };
    } catch (error) {
        // Do not log form data, email addresses, or invitation tokens.
        console.error("Public RSVP submission failed:", error);

        return {
            status: "error",
            message: "We couldn't submit your response. Please try again.",
            errors: {
                form: "Something went wrong while processing your RSVP. Your information has not been confirmed.",
            },
        };
    }
}