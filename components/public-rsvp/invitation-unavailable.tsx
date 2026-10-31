import Link from "next/link";
import {
    AlertCircle,
    CalendarX2,
    Clock3,
    ShieldX,
} from "lucide-react";


import type {
    InvitationUnavailableReason,
} from "@/lib/events/public-rsvp.service";

interface InvitationUnavailableProps {
    reason: InvitationUnavailableReason;
}

const states = {
    INVALID: {
        icon: AlertCircle,
        title: "Invitation unavailable",
        description:
            "This invitation link is invalid or may have been copied incorrectly. Please contact the event organizer for a valid link.",
    },
    REVOKED: {
        icon: ShieldX,
        title: "Invitation revoked",
        description:
            "The event organizer has revoked this invitation. You can no longer use this link to submit an RSVP.",
    },
    EXPIRED: {
        icon: Clock3,
        title: "Invitation expired",
        description:
            "This invitation has expired and is no longer accepting responses. Please contact the event organizer if you need assistance.",
    },
    EVENT_ENDED: {
        icon: CalendarX2,
        title: "This event has ended",
        description:
            "This event has already taken place, so new responses are no longer being accepted.",
    },
};

export function InvitationUnavailable({
    reason,
}: InvitationUnavailableProps) {
    const config = states[reason];
    const Icon = config.icon;

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f8f9fc] px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm sm:px-9">
                <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                    <Icon size={29} strokeWidth={1.6} />
                </span>

                <h1 className="mt-6 text-xl font-semibold tracking-tight text-slate-950">
                    {config.title}
                </h1>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                    {config.description}
                </p>

                <div className="mt-7 rounded-xl bg-slate-50 px-4 py-3">
                    <p className="text-xs leading-5 text-slate-500">
                        If you believe this is a mistake, please reach out to the person who shared this invitation with you.
                    </p>
                </div>

                <p className="mt-8 text-xs font-semibold tracking-tight text-slate-400">
                    Gatherly · Event invitations
                </p>
            </div>
        </main>
    );
}