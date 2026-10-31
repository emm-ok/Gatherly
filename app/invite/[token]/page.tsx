import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPublicInvitation } from "@/lib/events/public-rsvp.service";

import { PublicRSVPPage } from "@/components/public-rsvp/public-rsvp-page";
import { InvitationUnavailable } from "@/components/public-rsvp/invitation-unavailable";

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

export const metadata: Metadata = {
    title: "Respond to Invitation",
    description: "View event details and submit your RSVP.",
    robots: {
        index: false,
        follow: false,
        noarchive: true,
    },
    referrer: "no-referrer",
};

interface PublicInvitationPageProps {
    params: Promise<{
        token: string;
    }>;
}

export default async function PublicInvitationPage({
    params,
}: PublicInvitationPageProps) {
    const { token } = await params;

    // Invalid token shapes are rejected before any database query.
    if (!/^[A-Za-z0-9_-]{43}$/.test(token)) {
        notFound();
    }

    const invitation = await getPublicInvitation(token);

    if (!invitation.available || !invitation.event) {
        return (
            <InvitationUnavailable
                reason={invitation.reason ?? "INVALID"}
            />
        );
    }

    return (
        <PublicRSVPPage
            token={token}
            event={invitation.event}
        />
    );
}