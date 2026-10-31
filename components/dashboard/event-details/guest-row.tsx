
import type { GuestRecord } from "@/lib/events/event-details.types";
import { RSVPStatusBadge } from "./rsvp-status-badge";

interface GuestRowProps {
    guest: GuestRecord;
}

export function GuestRow({ guest }: GuestRowProps) {
    return (
        <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1.4fr)_130px_145px] items-center gap-4 px-4 py-3.5 transition-colors hover:bg-slate-50/70">
            <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-violet-50 text-xs font-semibold text-violet-700">
                    {guest.name.charAt(0).toUpperCase()}
                </span>

                <p className="truncate text-sm font-medium text-slate-800">
                    {guest.name}
                </p>
            </div>

            <p className="truncate text-sm text-slate-500">
                {guest.email}
            </p>

            <div>
                <RSVPStatusBadge status={guest.status} />
            </div>

            <p className="text-xs text-slate-500">
                {guest.createdAt.toLocaleDateString("en", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                })}
            </p>
        </div>
    );
}
