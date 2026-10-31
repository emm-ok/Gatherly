import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";

import { DashboardEmptyState } from "./dashboard-empty-state";
import { EventCard } from "./event-card";

import type { DashboardOverviewData } from "@/lib/dashboard/dashboard.service";

interface UpcomingEventsProps {
    events: DashboardOverviewData["upcomingEvents"];
    totalUpcoming: number;
}

export function UpcomingEvents({
    events,
    totalUpcoming,
}: UpcomingEventsProps) {
    return (
        <section aria-labelledby="upcoming-events-heading">
            <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                    <h2
                        id="upcoming-events-heading"
                        className="flex items-center gap-2 text-base font-semibold text-slate-950"
                    >
                        <CalendarClock
                            size={18}
                            className="text-violet-700"
                        />
                        Upcoming events
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                        Events scheduled next
                    </p>
                </div>

                {totalUpcoming > 0 && (
                    <Link
                        href="/dashboard/events"
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg px-2 text-xs font-semibold text-violet-700 transition-colors hover:bg-violet-50 hover:text-violet-900"
                    >
                        View all
                        <ArrowRight size={15} />
                    </Link>
                )}
            </div>

            {events.length === 0 ? (
                <DashboardEmptyState
                    icon="search"
                    title="Nothing scheduled yet"
                    description="When you create events with future dates, they'll appear here so you can keep track of what's coming up."
                    actionLabel="Plan an event"
                    actionHref="/dashboard/create-event"
                />
            ) : (
                <div className="space-y-3">
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}