import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DashboardEmptyState } from "./dashboard-empty-state";
import { EventCard } from "./event-card";

import type { DashboardOverviewData } from "@/lib/dashboard/dashboard.service";

interface RecentEventsProps {
    events: DashboardOverviewData["recentEvents"];
}

export function RecentEvents({
    events,
}: RecentEventsProps) {
    return (
        <section aria-labelledby="recent-events-heading">
            <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                    <h2
                        id="recent-events-heading"
                        className="text-base font-semibold text-slate-950"
                    >
                        Recent events
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                        Your latest created events
                    </p>
                </div>

                {events.length > 0 && (
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
                    title="Your events will appear here"
                    description="You haven't created an event yet. Create your first event to start organising and inviting guests."
                    actionLabel="Create your first event"
                    actionHref="/dashboard/create-event"
                />
            ) : (
                <div className="space-y-3">
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            showStatus
                        />
                    ))}
                </div>
            )}
        </section>
    );
}