import "server-only";

import { prisma } from "@/lib/prisma";

export async function getDashboardOverview(userId: string) {
    const now = new Date();

    const [
        totalEvents,
        upcomingEventsCount,
        pastEventsCount,
        recentEvents,
        upcomingEvents,
        recentRsvps,
        rsvpGroups,
    ] = await Promise.all([
        // All events owned by the authenticated user.
        prisma.event.count({
            where: {
                createdById: userId,
            },
        }),

        // Events that have not yet started.
        prisma.event.count({
            where: {
                createdById: userId,
                eventDate: {
                    gte: now,
                },
            },
        }),

        // Events whose scheduled dates have passed.
        prisma.event.count({
            where: {
                createdById: userId,
                eventDate: {
                    lt: now,
                },
            },
        }),

        // Recently created events.
        prisma.event.findMany({
            where: {
                createdById: userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
            select: {
                id: true,
                title: true,
                location: true,
                eventDate: true,
                imageUrl: true,
                createdAt: true,
                _count: {
                    select: {
                        rsvps: true,
                    },
                },
            },
        }),

        // The five nearest upcoming events.
        prisma.event.findMany({
            where: {
                createdById: userId,
                eventDate: {
                    gte: now,
                },
            },
            orderBy: {
                eventDate: "asc",
            },
            take: 5,
            select: {
                id: true,
                title: true,
                location: true,
                eventDate: true,
                imageUrl: true,
                _count: {
                    select: {
                        rsvps: true,
                    },
                },
            },
        }),

        // Latest guest responses across the user's events.
        prisma.eventRsvp.findMany({
            where: {
                event: {
                    createdById: userId,
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                createdAt: true,
                event: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        }),

        // Aggregate RSVP counts by attendance status.
        prisma.eventRsvp.groupBy({
            by: ["status"],
            where: {
                event: {
                    createdById: userId,
                },
            },
            _count: {
                _all: true,
            },
        }),
    ]);

    const rsvpCounts = {
        GOING: 0,
        MAYBE: 0,
        NOT_GOING: 0,
    };

    for (const group of rsvpGroups) {
        rsvpCounts[group.status] = group._count._all;
    }

    const totalResponses =
        rsvpCounts.GOING +
        rsvpCounts.MAYBE +
        rsvpCounts.NOT_GOING;

    return {
        stats: {
            totalEvents,
            upcomingEvents: upcomingEventsCount,
            pastEvents: pastEventsCount,
            totalResponses,
            going: rsvpCounts.GOING,
            maybe: rsvpCounts.MAYBE,
            notGoing: rsvpCounts.NOT_GOING,
        },
        recentEvents,
        upcomingEvents,
        recentRsvps,
    };
}

export type DashboardOverviewData = Awaited<
    ReturnType<typeof getDashboardOverview>
>;