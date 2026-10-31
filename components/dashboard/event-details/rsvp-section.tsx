
import { Users } from "lucide-react";

import type {
    GuestRecord,
    RSVPQuery,
} from "@/lib/events/event-details.types";

import { RSVPToolbar } from "./rsvp-toolbar";
import { GuestList } from "./guest-list";
import { RSVPPagination } from "./rsvp-pagination";

interface RSVPSectionProps {
    eventId: string;
    guests: GuestRecord[];
    filters: RSVPQuery;
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
}

export function RSVPSection({
    eventId,
    guests,
    filters,
    pagination,
}: RSVPSectionProps) {
    return (
        <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                        <Users size={19} />
                    </span>

                    <div>
                        <h2 className="text-base font-semibold text-slate-950">
                            Guest list
                        </h2>
                        <p className="mt-0.5 text-xs text-slate-500">
                            {pagination.total.toLocaleString()} matching responses
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-5 sm:p-6">
                <RSVPToolbar
                    eventId={eventId}
                    filters={filters}
                />

                <div className="mt-5">
                    <GuestList guests={guests} />
                </div>

                {pagination.total > 0 && (
                    <div className="mt-5 border-t border-slate-100 pt-5">
                        <RSVPPagination
                            eventId={eventId}
                            filters={filters}
                            pagination={pagination}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
