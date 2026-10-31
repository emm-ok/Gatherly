
import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";

function hashToken(token: string): string {
    return createHash("sha256").update(token).digest("hex");
}

function getAppUrl(): string {
    const configuredUrl =
        process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;

    if (!configuredUrl) {
        throw new Error("APP_URL is not configured.");
    }

    const url = new URL(configuredUrl);

    if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
        throw new Error("APP_URL must use HTTPS in production.");
    }

    return url.origin;
}

export async function createEventInvitation(
    userId: string,
    eventId: string,
) {
    const appUrl = getAppUrl()

    const event = await prisma.event.findFirst({
        where: {
            id: eventId,
            createdById: userId,
        },
        select: {
            id: true,
        },
    });

    if (!event) {
        throw new Error("Event not found.");
    }

    const token = randomBytes(32).toString("base64url");
    const tokenHash = hashToken(token);

    const invitation = await prisma.eventInvite.create({
        data: {
            eventId,
            tokenHash,
        },
        select: {
            id: true,
            status: true,
            createdAt: true,
            expiresAt: true,
        },
    });

    const inviteUrl = `${appUrl}/invite/${token}`;

    return {
        invitation,
        inviteUrl,
    };
}

export async function revokeEventInvitation(
    userId: string,
    eventId: string,
    invitationId: string,
) {
    const result = await prisma.eventInvite.updateMany({
        where: {
            id: invitationId,
            eventId,
            event: {
                createdById: userId,
            },
            status: "ACTIVE",
        },
        data: {
            status: "REVOKED",
            revokedAt: new Date(),
        },
    });

    if (result.count === 0) {
        throw new Error(
            "This invitation could not be revoked. It may already be revoked or no longer exist.",
        );
    }

    return { success: true };
}
