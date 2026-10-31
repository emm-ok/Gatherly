
import { CalendarDays, Mail, Users } from "lucide-react";

import type { GuestRecord } from "@/lib/events/event-details.types";

import { RSVPStatusBadge } from "./rsvp-status-badge";
import { GuestRow } from "./guest-row";
import { EventDetailsEmptyState } from "./event-details-empty-state";

interface GuestListProps {
    guests: GuestRecord[];
}

export function GuestList({ guests }: GuestListProps) {
    if (guests.length === 0) {
        return (
            <EventDetailsEmptyState
                icon={<Users size={23} />}
                title="No guests found"
                description="There are no responses matching your current search or filters."
            />
        );
    }

    return (
        <>
            {/* Desktop list */}
            <div className="hidden overflow-hidden rounded-xl border border-slate-100 md:block">
                <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1.4fr)_130px_145px] gap-4 bg-slate-50/80 px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    <span>Guest</span>
                    <span>Email address</span>
                    <span>RSVP status</span>
                    <span>Response date</span>
                </div>

                <div className="divide-y divide-slate-100">
                    {guests.map((guest) => (
                        <GuestRow key={guest.id} guest={guest} />
                    ))}
                </div>
            </div>

            {/* Mobile guest cards */}
            <div className="space-y-3 md:hidden">
                {guests.map((guest) => (
                    <article
                        key={guest.id}
                        className="rounded-xl border border-slate-200 p-4"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-sm font-semibold text-violet-700">
                                    {guest.name.charAt(0).toUpperCase()}
                                </span>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-slate-900">
                                        {guest.name}
                                    </p>
                                    <p className="mt-0.5 break-all text-xs text-slate-500">
                                        {guest.email}
                                    </p>
                                </div>
                            </div>

                            <RSVPStatusBadge status={guest.status} />
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1.5">
                                <CalendarDays size={13} />
                                Responded
                            </span>
                            <span>{guest.createdAt.toLocaleDateString()}</span>
                        </div>
                    </article>
                ))}
            </div>
        </>
    );
}
