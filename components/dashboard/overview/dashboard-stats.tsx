import {
    CalendarDays,
    CalendarClock,
    Users,
    UserCheck,
} from "lucide-react";

import type { DashboardOverviewData } from "@/lib/dashboard/dashboard.service";
import { StatCard } from "./stats-card";

interface DashboardStatsProps {
    stats: DashboardOverviewData["stats"];
}

export function DashboardStats({
    stats,
}: DashboardStatsProps) {
    const items = [
        {
            title: "Total events",
            value: stats.totalEvents,
            description: "Events you've created",
            icon: CalendarDays,
            iconClassName: "bg-violet-50 text-violet-700",
        },
        {
            title: "Upcoming events",
            value: stats.upcomingEvents,
            description: "Events scheduled ahead",
            icon: CalendarClock,
            iconClassName: "bg-blue-50 text-blue-700",
        },
        {
            title: "Guest responses",
            value: stats.totalResponses,
            description: "Total RSVP submissions",
            icon: Users,
            iconClassName: "bg-orange-50 text-orange-700",
        },
        {
            title: "Confirmed guests",
            value: stats.going,
            description: "Guests who plan to attend",
            icon: UserCheck,
            iconClassName: "bg-emerald-50 text-emerald-700",
        },
    ];

    return (
        <section aria-label="Event statistics">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {items.map((item) => (
                    <StatCard key={item.title} {...item} />
                ))}
            </div>
        </section>
    );
}