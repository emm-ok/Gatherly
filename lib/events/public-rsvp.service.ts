
import "server-only";

import { createHash } from "node:crypto";

import { prisma } from "@/lib/prisma";
import { RSVPStatus } from "../generated/prisma/enums";
import { Prisma } from "../generated/prisma/client";

export type InvitationUnavailableReason =
    | "INVALID"
    | "REVOKED"
    | "EXPIRED"
    | "EVENT_ENDED";

export interface PublicEventData {
    id: string;
    title: string;
    description: string;
    location: string;
    eventDate: Date;
    imageUrl: string | null;
}

export interface PublicInvitationResult {
    available: boolean;
    reason?: InvitationUnavailableReason;
    event?: PublicEventData;
}

function hashToken(token: string): string {
    return createHash("sha256")
        .update(token)
        .digest("hex");
}

function isValidTokenFormat(token: string): boolean {
    // randomBytes(32).toString("base64url") produces 43 characters.
    return /^[A-Za-z0-9_-]{43}$/.test(token);
}

export async function getPublicInvitation(
    token: string,
): Promise<PublicInvitationResult> {
    if (!isValidTokenFormat(token)) {
        return {
            available: false,
            reason: "INVALID",
        };
    }

    const tokenHash = hashToken(token);

    const invitation = await prisma.eventInvite.findUnique({
        where: {
            tokenHash,
        },
        select: {
            status: true,
            expiresAt: true,
            event: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    location: true,
                    eventDate: true,
                    imageUrl: true,
                },
            },
        },
    });

    if (!invitation) {
        return {
            available: false,
            reason: "INVALID",
        };
    }

    if (invitation.status === "REVOKED") {
        return {
            available: false,
            reason: "REVOKED",
        };
    }

    const now = new Date();

    if (
        invitation.expiresAt &&
        invitation.expiresAt.getTime() <= now.getTime()
    ) {
        return {
            available: false,
            reason: "EXPIRED",
        };
    }

    if (invitation.event.eventDate.getTime() <= now.getTime()) {
        return {
            available: false,
            reason: "EVENT_ENDED",
        };
    }

    return {
        available: true,
        event: invitation.event,
    };
}



export interface SubmitPublicRSVPInput {
    token: string;
    name: string;
    email: string;
    status: RSVPStatus;
}

export type SubmitPublicRSVPResult =
    | {
        success: true;
        isUpdate: boolean;
        status: RSVPStatus;
    }
    | {
        success: false;
        reason: InvitationUnavailableReason;
    };

export async function submitPublicRSVP(
    input: SubmitPublicRSVPInput,
): Promise<SubmitPublicRSVPResult> {
    if (!isValidTokenFormat(input.token)) {
        return {
            success: false,
            reason: "INVALID",
        };
    }

    const tokenHash = hashToken(input.token);
    const emailNormalized = input.email.trim().toLowerCase();
    const name = input.name.trim();
    const now = new Date();

    // Serializable isolation ensures the invitation validation and RSVP
    // write participate in the same consistent database transaction.
    // Retry serialization conflicts caused by concurrent updates/revocation.
    for (let attempt = 0; attempt < 2; attempt++) {
        try {
            return await prisma.$transaction(
                async (tx) => {
                    const invitation = await tx.eventInvite.findUnique({
                        where: {
                            tokenHash,
                        },
                        select: {
                            id: true,
                            status: true,
                            expiresAt: true,
                            event: {
                                select: {
                                    id: true,
                                    eventDate: true,
                                },
                            },
                        },
                    });

                    if (!invitation) {
                        return {
                            success: false,
                            reason: "INVALID",
                        };
                    }

                    if (invitation.status === "REVOKED") {
                        return {
                            success: false,
                            reason: "REVOKED",
                        };
                    }

                    if (
                        invitation.expiresAt &&
                        invitation.expiresAt.getTime() <= now.getTime()
                    ) {
                        return {
                            success: false,
                            reason: "EXPIRED",
                        };
                    }

                    if (
                        invitation.event.eventDate.getTime() <= now.getTime()
                    ) {
                        return {
                            success: false,
                            reason: "EVENT_ENDED",
                        };
                    }

                    const existing = await tx.eventRsvp.findUnique({
                        where: {
                            eventId_emailNormalized: {
                                eventId: invitation.event.id,
                                emailNormalized,
                            },
                        },
                        select: {
                            id: true,
                        },
                    });

                    await tx.eventRsvp.upsert({
                        where: {
                            eventId_emailNormalized: {
                                eventId: invitation.event.id,
                                emailNormalized,
                            },
                        },
                        create: {
                            eventId: invitation.event.id,
                            inviteId: invitation.id,
                            name,
                            email: input.email.trim(),
                            emailNormalized,
                            status: input.status,
                        },
                        update: {
                            inviteId: invitation.id,
                            name,
                            email: input.email.trim(),
                            status: input.status,
                        },
                    });

                    return {
                        success: true,
                        isUpdate: Boolean(existing),
                        status: input.status,
                    };
                },
                {
                    isolationLevel:
                        Prisma.TransactionIsolationLevel.Serializable,
                },
            );
        } catch (error) {
            const isSerializationConflict =
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2034";

            if (isSerializationConflict && attempt === 0) {
                continue;
            }

            throw error;
        }
    }

    throw new Error("Unable to process RSVP.");
}