import "server-only";

import { prisma } from "@/lib/prisma";

export type EventStatusFilter = "all" | "upcoming" | "past";

export type EventSortOption =
    | "date-asc"
    | "date-desc"
    | "newest"
    | "oldest";

export type GetEventsOptions = {
    userId: string;
    search?: string;
    status?: EventStatusFilter;
    sort?: EventSortOption;
    page?: number;
    pageSize?: number;
};

const DEFAULT_PAGE_SIZE = 9;
const MAX_PAGE_SIZE = 24;

export async function getUserEvents({
    userId,
    search = "",
    status = "all",
    sort = "newest",
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
}: GetEventsOptions) {
    const now = new Date();

    const safePage = Math.max(1, Math.floor(page));

    const safePageSize = Math.min(
        MAX_PAGE_SIZE,
        Math.max(1, Math.floor(pageSize)),
    );

    const where: NonNullable<
        Parameters<typeof prisma.event.findMany>[0]
    >["where"] = {
        createdById: userId,
    };

    const trimmedSearch = search.trim();

    if (trimmedSearch) {
        where.OR = [
            {
                title: {
                    contains: trimmedSearch,
                    mode: "insensitive",
                },
            },
            {
                location: {
                    contains: trimmedSearch,
                    mode: "insensitive",
                },
            },
        ];
    }

    if (status === "upcoming") {
        where.eventDate = { gte: now };
    }

    if (status === "past") {
        where.eventDate = { lt: now };
    }

    const orderBy = {
        "date-asc": { eventDate: "asc" },
        "date-desc": { eventDate: "desc" },
        newest: { createdAt: "desc" },
        oldest: { createdAt: "asc" },
    }[sort] as {
        eventDate?: "asc" | "desc";
        createdAt?: "asc" | "desc";
    };

    const [events, totalEvents] = await Promise.all([
        prisma.event.findMany({
            where,
            orderBy,
            skip: (safePage - 1) * safePageSize,
            take: safePageSize,
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

        prisma.event.count({ where }),
    ]);

    const totalPages = Math.ceil(
        totalEvents / safePageSize,
    );

    return {
        events,
        pagination: {
            currentPage: safePage,
            pageSize: safePageSize,
            totalEvents,
            totalPages,
            hasNextPage: safePage < totalPages,
            hasPreviousPage: safePage > 1,
        },
    };
}

export async function createEventRecord(data: {
    title: string;
    description: string;
    location: string;
    eventDate: Date;
    createdById: string;
    imageUrl?: string;
    imagePublicId?: string;
}) {
    return prisma.event.create({
        data: {
            title: data.title,
            description: data.description,
            location: data.location,
            eventDate: data.eventDate,
            createdById: data.createdById,
            imageUrl: data.imageUrl,
            imagePublicId: data.imagePublicId,
        },
        select: {
            id: true,
            title: true,
            eventDate: true,
        },
    });
}

export async function deleteEventRecord(
    eventId: string,
    userId: string,
) {
    const event = await prisma.event.findFirst({
        where: {
            id: eventId,
            createdById: userId,
        },
        select: {
            id: true,
            imagePublicId: true,
        },
    });

    if (!event) {
        return null;
    }

    await prisma.event.delete({
        where: {
            id: event.id,
        },
    });

    return event;
}