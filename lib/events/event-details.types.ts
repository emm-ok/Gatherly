
import type { InviteStatus, RSVPStatus } from "../generated/prisma/client";

export type RSVPFilter = "ALL" | RSVPStatus;

export type RSVPSort =
    | "NEWEST"
    | "OLDEST"
    | "NAME_ASC"
    | "NAME_DESC";

export interface RSVPQuery {
    search: string;
    status: RSVPFilter;
    sort: RSVPSort;
    page: number;
    pageSize: number;
}

export interface GuestRecord {
    id: string;
    name: string;
    email: string;
    status: RSVPStatus;
    createdAt: Date;
    updatedAt: Date;
    invite: {
        id: string;
        createdAt: Date;
    } | null;
}

export interface InvitationRecord {
    id: string;
    status: InviteStatus;
    expiresAt: Date | null;
    revokedAt: Date | null;
    createdAt: Date;
    rsvpCount: number;
}

export interface EventStatistics {
    total: number;
    going: number;
    maybe: number;
    notGoing: number;
}

export interface EventDetailsData {
    event: {
        id: string;
        title: string;
        description: string;
        location: string;
        eventDate: Date;
        imageUrl: string | null;
        createdAt: Date;
        statistics: EventStatistics;
    };
    guests: GuestRecord[];
    invitations: InvitationRecord[];
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
    filters: RSVPQuery;
}
