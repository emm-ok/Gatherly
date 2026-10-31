
import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";

import type { DashboardOverviewData } from "@/lib/dashboard/dashboard.service";

interface RecentActivityProps {
    activities: DashboardOverviewData["recentRsvps"];
}

const statusStyles = {
    GOING: "border-emerald-200 bg-emerald-50 text-emerald-700",
    MAYBE: "border-amber-200 bg-amber-50 text-amber-700",
    NOT_GOING: "border-slate-200 bg-slate-100 text-slate-600",
};

const statusLabels = {
    GOING: "Going",
    MAYBE: "Maybe",
    NOT_GOING: "Not going",
};

function getInitials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

function formatActivityDate(date: Date) {
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
    }).format(date);
}

export function RecentActivity({ activities }: RecentActivityProps) {
    return (
        <section aria-labelledby="recent-activity-heading">
            {/* Section heading */}
            <div className="mb-5">
                <h2
                    id="recent-activity-heading"
                    className="text-base font-semibold tracking-tight text-slate-950"
                >
                    Recent guest activity
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                    The latest responses from your guests
                </p>
            </div>

            {/* Activity container */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-950/[0.02]">
                {activities.length === 0 ? (
                    <div className="flex flex-col items-center px-5 py-12 text-center">
                        <span className="flex size-11 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                            <Users size={21} strokeWidth={1.8} />
                        </span>

                        <h3 className="mt-4 text-sm font-semibold text-slate-900">
                            No guest activity yet
                        </h3>

                        <p className="mt-2 max-w-xs text-xs leading-6 text-slate-500">
                            Guest responses will appear here when someone
                            submits an RSVP through your invitation links.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start gap-3 px-4 py-4 transition-colors hover:bg-slate-50/60 sm:px-5"
                            >
                                {/* Guest avatar */}
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-violet-50 text-xs font-semibold text-violet-700">
                                    {getInitials(activity.name)}
                                </span>

                                {/* Activity details */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="truncate text-sm font-semibold text-slate-900">
                                            {activity.name}
                                        </p>

                                        <span
                                            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusStyles[activity.status]}`}
                                        >
                                            {statusLabels[activity.status]}
                                        </span>
                                    </div>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Responded to{" "}
                                        <Link
                                            href={`/dashboard/events/${activity.event.id}`}
                                            className="font-medium text-slate-700 transition-colors hover:text-violet-700"
                                        >
                                            {activity.event.title}
                                        </Link>
                                    </p>

                                    <p className="mt-1.5 text-[11px] text-slate-400">
                                        {formatActivityDate(activity.createdAt)}
                                    </p>
                                </div>

                                {/* View event */}
                                <Link
                                    href={`/dashboard/events/${activity.event.id}`}
                                    aria-label={`View ${activity.event.title}`}
                                    className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                                >
                                    <ArrowUpRight size={16} />
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
