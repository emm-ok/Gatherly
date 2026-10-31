
import { notFound, redirect } from "next/navigation";

import { requireAuthenticatedUser } from "@/lib/auth/auth.service";
import { AuthenticationError } from "@/lib/auth/auth.errors";

import {
    getEventDetails,
    normalizeRSVPQuery,
} from "@/lib/events/event-details.service";

import { EventDetailsHeader } from "@/components/dashboard/event-details/event-details-header";
import { EventOverview } from "@/components/dashboard/event-details/event-overview";
import { EventStatistics } from "@/components/dashboard/event-details/event-statistics";
import { RSVPSection } from "@/components/dashboard/event-details/rsvp-section";
import { InvitationSection } from "@/components/dashboard/event-details/invitation-section";

interface EventDetailsPageProps {
    params: Promise<{
        eventId: string;
    }>;
    searchParams: Promise<{
        q?: string;
        status?: string;
        sort?: string;
        page?: string;
    }>;
}

export default async function EventDetailsPage({
    params,
    searchParams,
}: EventDetailsPageProps) {
    const [{ eventId }, queryParams] = await Promise.all([
        params,
        searchParams,
    ]);

    let user;

    try {
        user = await requireAuthenticatedUser();
    } catch (error) {
        if (error instanceof AuthenticationError) {
            redirect("/auth/sign-in");
        }

        throw error;
    }

    const filters = normalizeRSVPQuery(queryParams);

    const data = await getEventDetails(
        user.id,
        eventId,
        filters,
    );

    if (!data) notFound();

    // Correct an invalid page number after obtaining the filtered count.
    if (
        data.pagination.totalPages > 0 &&
        filters.page > data.pagination.totalPages
    ) {
        const params = new URLSearchParams();

        if (filters.search) params.set("q", filters.search);
        if (filters.status !== "ALL") params.set("status", filters.status);
        if (filters.sort !== "NEWEST") params.set("sort", filters.sort);

        params.set("page", String(data.pagination.totalPages));

        redirect(
            `/dashboard/events/${eventId}?${params.toString()}`,
        );
    }

    return (
        <div className="mx-auto w-full max-w-[1440px] space-y-8 pb-12">
            <EventDetailsHeader
                eventId={data.event.id}
                title={data.event.title}
            />

            <EventOverview event={data.event} />

            <EventStatistics statistics={data.event.statistics} />

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
                <RSVPSection
                    eventId={data.event.id}
                    guests={data.guests}
                    filters={data.filters}
                    pagination={data.pagination}
                />

                <InvitationSection
                    eventId={data.event.id}
                    invitations={data.invitations}
                />
            </div>
        </div>
    );
}
