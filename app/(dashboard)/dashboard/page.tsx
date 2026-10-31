import { redirect } from "next/navigation";

import { requireAuthenticatedUser } from "@/lib/auth/auth.service";
import { AuthenticationError } from "@/lib/auth/auth.errors";
import { getDashboardOverview } from "@/lib/dashboard/dashboard.service";

import { DashboardWelcome } from "@/components/dashboard/overview/dashboard-welcome";
import { DashboardStats } from "@/components/dashboard/overview/dashboard-stats";
import { UpcomingEvents } from "@/components/dashboard/overview/upcoming-events";
import { RecentEvents } from "@/components/dashboard/overview/recent-events";
import { RecentActivity } from "@/components/dashboard/overview/recent-activity";
import { AttendanceSummary } from "@/components/dashboard/overview/attendance-summary";
import { Reveal } from "@/components/marketing/reveal";


export default async function DashboardPage() {
    let user;

    try {
        user = await requireAuthenticatedUser();
    } catch (error) {
        if (error instanceof AuthenticationError) {
            redirect("/auth/sign-in");
        }

        throw error;
    }

    const overview = await getDashboardOverview(user.id);

    return (
        <div className="space-y-9 pb-10">
            {/* Welcome and primary action */}
            <Reveal>
                <DashboardWelcome name={user.name} />
            </Reveal>

            {/* Statistics */}
            <Reveal delay={0.05}>
                <DashboardStats stats={overview.stats} />
            </Reveal>

            {/* Upcoming events and attendance */}
            <div className="grid items-start gap-9 xl:grid-cols-[1.45fr_0.85fr]">
                <Reveal delay={0.08}>
                    <UpcomingEvents
                        events={overview.upcomingEvents}
                        totalUpcoming={overview.stats.upcomingEvents}
                    />
                </Reveal>

                <Reveal delay={0.12}>
                    <AttendanceSummary stats={overview.stats} />
                </Reveal>
            </div>

            {/* Recent events and guest activity */}
            <div className="grid items-start gap-9 xl:grid-cols-[1.45fr_0.85fr]">
                <Reveal delay={0.08}>
                    <RecentEvents events={overview.recentEvents} />
                </Reveal>

                <Reveal delay={0.12}>
                    <RecentActivity activities={overview.recentRsvps} />
                </Reveal>
            </div>
        </div>
    );
}