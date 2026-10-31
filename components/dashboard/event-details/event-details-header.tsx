
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface EventDetailsHeaderProps {
    eventId: string;
    title: string;
}

export function EventDetailsHeader({
    eventId,
    title,
}: EventDetailsHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
                <Link
                    href="/dashboard/events"
                    className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
                >
                    <ArrowLeft size={16} />
                    Back to events
                </Link>

                <h1 className="truncate text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                    {title}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Manage event information, guests, and invitations.
                </p>
            </div>

            <Link
                href={`/invite-preview/${eventId}`}
                className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 sm:self-auto"
            >
                Preview event
                <ExternalLink size={15} />
            </Link>
        </div>
    );
}
