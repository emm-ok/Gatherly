
import { prisma } from "@/lib/prisma";
import type {
    EventDetailsData,
    RSVPQuery,
} from "./event-details.types";
import { RSVPStatus } from "../generated/prisma/enums";


const PAGE_SIZE = 10;
const MAX_PAGE = 100_000;

export function normalizeRSVPQuery(
    params: Record<string, string | undefined>,
): RSVPQuery {
    const allowedStatuses = ["ALL", "GOING", "MAYBE", "NOT_GOING"];
    const allowedSorts = [
        "NEWEST",
        "OLDEST",
        "NAME_ASC",
        "NAME_DESC",
    ];

    const requestedStatus = params.status?.toUpperCase() ?? "ALL";
    const requestedSort = params.sort?.toUpperCase() ?? "NEWEST";

    const parsedPage = Number.parseInt(params.page ?? "1", 10);

    return {
        search: (params.q ?? "").trim().slice(0, 100),
        status: allowedStatuses.includes(requestedStatus)
            ? (requestedStatus as RSVPQuery["status"])
            : "ALL",
        sort: allowedSorts.includes(requestedSort)
            ? (requestedSort as RSVPQuery["sort"])
            : "NEWEST",
        page: Number.isFinite(parsedPage)
            ? Math.min(Math.max(parsedPage, 1), MAX_PAGE)
            : 1,
        pageSize: PAGE_SIZE,
    };
}

export async function getEventDetails(
    userId: string,
    eventId: string,
    filters: RSVPQuery,
): Promise<EventDetailsData | null> {
    const event = await prisma.event.findFirst({
        where: {
            id: eventId,
            createdById: userId,
        },
        select: {
            id: true,
            title: true,
            description: true,
            location: true,
            eventDate: true,
            imageUrl: true,
            createdAt: true,
        },
    });

    if (!event) return null;

    const guestWhere = {
        eventId,
        ...(filters.status !== "ALL"
            ? { status: filters.status as RSVPStatus }
            : {}),
        ...(filters.search
            ? {
                OR: [
                    {
                        name: {
                            contains: filters.search,
                            mode: "insensitive" as const,
                        },
                    },
                    {
                        email: {
                            contains: filters.search,
                            mode: "insensitive" as const,
                        },
                    },
                ],
            }
            : {}),
    };

    const orderBy = (() => {
        switch (filters.sort) {
            case "OLDEST":
                return [{ createdAt: "asc" as const }, { id: "asc" as const }];
            case "NAME_ASC":
                return [{ name: "asc" as const }, { id: "asc" as const }];
            case "NAME_DESC":
                return [{ name: "desc" as const }, { id: "desc" as const }];
            default:
                return [{ createdAt: "desc" as const }, { id: "desc" as const }];
        }
    })();

    const skip = (filters.page - 1) * filters.pageSize;

    const [
        total,
        guests,
        groupedStatistics,
        invitationRows,
    ] = await Promise.all([
        prisma.eventRsvp.count({
            where: guestWhere,
        }),

        prisma.eventRsvp.findMany({
            where: guestWhere,
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                invite: {
                    select: {
                        id: true,
                        createdAt: true,
                    },
                },
            },
            orderBy,
            skip,
            take: filters.pageSize,
        }),

        prisma.eventRsvp.groupBy({
            by: ["status"],
            where: { eventId },
            _count: {
                _all: true,
            },
        }),

        prisma.eventInvite.findMany({
            where: { eventId },
            select: {
                id: true,
                status: true,
                expiresAt: true,
                revokedAt: true,
                createdAt: true,
                _count: {
                    select: {
                        rsvps: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 20,
        }),
    ]);

    const statistics = {
        total: 0,
        going: 0,
        maybe: 0,
        notGoing: 0,
    };

    for (const item of groupedStatistics) {
        const count = item._count._all;

        statistics.total += count;

        if (item.status === "GOING") statistics.going = count;
        if (item.status === "MAYBE") statistics.maybe = count;
        if (item.status === "NOT_GOING") statistics.notGoing = count;
    }

    const totalPages = Math.ceil(total / filters.pageSize);

    return {
        event: {
            ...event,
            statistics,
        },

        guests,

        invitations: invitationRows.map((invite) => ({
            id: invite.id,
            status: invite.status,
            expiresAt: invite.expiresAt,
            revokedAt: invite.revokedAt,
            createdAt: invite.createdAt,
            rsvpCount: invite._count.rsvps,
        })),

        pagination: {
            page: filters.page,
            pageSize: filters.pageSize,
            total,
            totalPages,
        },

        filters,
    };
}
