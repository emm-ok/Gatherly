
import type { RSVPStatus } from "../generated/prisma/client";

export interface PublicRSVPInput {
    token: string;
    name: string;
    email: string;
    status: RSVPStatus;
}

export interface PublicRSVPValidationResult {
    success: boolean;
    data?: PublicRSVPInput;
    errors?: {
        name?: string;
        email?: string;
        status?: string;
        form?: string;
    };
}

const EMAIL_PATTERN =
    /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

const ALLOWED_STATUSES = [
    "GOING",
    "MAYBE",
    "NOT_GOING",
] as const;

export function validatePublicRSVP(
    formData: FormData,
): PublicRSVPValidationResult {
    const rawToken = formData.get("token");
    const rawName = formData.get("name");
    const rawEmail = formData.get("email");
    const rawStatus = formData.get("status");

    const errors: NonNullable<
        PublicRSVPValidationResult["errors"]
    > = {};

    const token =
        typeof rawToken === "string" ? rawToken.trim() : "";

    const name =
        typeof rawName === "string" ? rawName.trim() : "";

    const email =
        typeof rawEmail === "string" ? rawEmail.trim() : "";

    const status =
        typeof rawStatus === "string" ? rawStatus : "";

    if (!/^[A-Za-z0-9_-]{43}$/.test(token)) {
        errors.form = "This invitation link is invalid.";
    }

    if (!name) {
        errors.name = "Please enter your name.";
    } else if (name.length > 120) {
        errors.name = "Your name must be 120 characters or fewer.";
    } else if (/[\u0000-\u001F\u007F]/.test(name)) {
        errors.name = "Please enter a valid name.";
    }

    if (!email) {
        errors.email = "Please enter your email address.";
    } else if (email.length > 320 || !EMAIL_PATTERN.test(email)) {
        errors.email = "Please enter a valid email address.";
    }

    if (!ALLOWED_STATUSES.includes(status as RSVPStatus)) {
        errors.status = "Please select an RSVP response.";
    }

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            errors,
        };
    }

    return {
        success: true,
        data: {
            token,
            name,
            email,
            status: status as RSVPStatus,
        },
    };
}
