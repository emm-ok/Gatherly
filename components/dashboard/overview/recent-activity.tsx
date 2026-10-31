import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export function RecentActivity({
    activities,
}: RecentActivityProps) {
    return (
        <section aria-labelledby="recent-activity-heading">
            <div className="mb-5">
                <h2
                    id="recent-activity-heading"
                    className="text-base font-semibold text-slate-950"
                >
                    Recent guest activity
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                    The latest responses from your guests
                </p>
            </div>

            <Card className="overflow-hidden rounded-2xl border-slate-200/80 bg-white py-0 shadow-none">
                {activities.length === 0 ? (
                    <CardContent className="flex flex-col items-center px-5 py-10 text-center">
                        <span className="flex size-11 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                            <Users size={21} />
                        </span>

                        <h3 className="mt-4 text-sm font-semibold text-slate-900">
                            No guest activity yet
                        </h3>

                        <p className="mt-2 max-w-xs text-xs leading-6 text-slate-500">
                            Guest responses will appear here when someone
                            submits an RSVP through your invitation links.
                        </p>
                    </CardContent>
                ) : (
                    <CardContent className="divide-y divide-slate-100 p-0">
                        {activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start gap-3 px-4 py-4 sm:px-5"
                            >
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-violet-50 text-xs font-semibold text-violet-700">
                                    {getInitials(activity.name)}
                                </span>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="truncate text-sm font-semibold text-slate-900">
                                            {activity.name}
                                        </p>

                                        <Badge
                                            variant="outline"
                                            className={statusStyles[activity.status]}
                                        >
                                            {statusLabels[activity.status]}
                                        </Badge>
                                    </div>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Responded to{" "}
                                        <Link
                                            href={`/dashboard/events/${activity.event.id}`}
                                            className="font-medium text-slate-700 hover:text-violet-700"
                                        >
                                            {activity.event.title}
                                        </Link>
                                    </p>

                                    <p className="mt-1.5 text-[11px] text-slate-400">
                                        {formatActivityDate(activity.createdAt)}
                                    </p>
                                </div>

                                <Link
                                    href={`/dashboard/events/${activity.event.id}`}
                                    aria-label={`View ${activity.event.title}`}
                                    className="mt-1 shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-violet-50 hover:text-violet-700"
                                >
                                    <ArrowUpRight size={16} />
                                </Link>
                            </div>
                        ))}
                    </CardContent>
                )}
            </Card>
        </section>
    );
}