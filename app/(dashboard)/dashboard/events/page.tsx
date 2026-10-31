import { redirect } from "next/navigation";

import {
  requireAuthenticatedUser,
} from "@/lib/auth/auth.service";

import {
  AuthenticationError,
} from "@/lib/auth/auth.errors";

import {
  getUserEvents,
  type EventSortOption,
  type EventStatusFilter,
} from "@/lib/events/event.service";

import { Reveal } from "@/components/marketing/reveal";

import {
  EventsPageHeader,
} from "@/components/dashboard/events/events-page-header";

import {
  EventsFilters,
} from "@/components/dashboard/events/events-filters";

import {
  EventsList,
} from "@/components/dashboard/events/events-list";

import {
  EventsEmptyState,
} from "@/components/dashboard/events/events-empty-state";

import {
  EventsPagination,
} from "@/components/dashboard/events/events-pagination";

type SearchParams = Promise<{
  q?: string;
  status?: string;
  sort?: string;
  page?: string;
  created?: string;
}>;

const validStatuses: EventStatusFilter[] = [
  "all",
  "upcoming",
  "past",
];

const validSortOptions: EventSortOption[] = [
  "date-asc",
  "date-desc",
  "newest",
  "oldest",
];

function parsePositiveInteger(value?: string) {
  if (!value || !/^\d+$/.test(value)) return 1;

  const parsed = Number(value);

  if (!Number.isSafeInteger(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

export const metadata = {
  title: "Your Events | Gatherly",
  description: "View and manage your events.",
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  let user;

  try {
    user = await requireAuthenticatedUser();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      redirect("/auth/sign-in");
    }

    throw error;
  }

  const params = await searchParams;

  const search = (params.q ?? "").trim().slice(0, 120);

  const requestedStatus = params.status ?? "all";

  const status: EventStatusFilter = validStatuses.includes(
    requestedStatus as EventStatusFilter,
  )
    ? (requestedStatus as EventStatusFilter)
    : "all";

  const requestedSort = params.sort ?? "newest";

  const sort: EventSortOption = validSortOptions.includes(
    requestedSort as EventSortOption,
  )
    ? (requestedSort as EventSortOption)
    : "newest";

  const requestedPage = parsePositiveInteger(params.page);

  const result = await getUserEvents({
    userId: user.id,
    search,
    status,
    sort,
    page: requestedPage,
    pageSize: 9,
  });

  // If the user requests a page beyond the available results,
  // redirect to the last valid page.
  if (
    result.pagination.totalPages > 0 &&
    requestedPage > result.pagination.totalPages
  ) {
    const nextParams = new URLSearchParams();

    if (search) nextParams.set("q", search);
    if (status !== "all") nextParams.set("status", status);
    if (sort !== "newest") nextParams.set("sort", sort);

    nextParams.set(
      "page",
      String(result.pagination.totalPages),
    );

    redirect(`/dashboard/events?${nextParams.toString()}`);
  }

  const hasFilters =
    Boolean(search) ||
    status !== "all" ||
    sort !== "newest";

  return (
    <div className="space-y-7 pb-10">
      <Reveal>
        <EventsPageHeader
          totalEvents={result.pagination.totalEvents}
        />
      </Reveal>

      {params.created === "1" && (
        <div
          role="status"
          className="rounded-xl border border-emerald-200/70 bg-emerald-200/70 px-4 py-3 text-sm text-emerald-800"
        >
          Your event has been created successfully.
        </div>
      )}

      <Reveal delay={0.05}>
        <EventsFilters
          search={search}
          status={status}
          sort={sort}
        />
      </Reveal>

      {result.events.length > 0 ? (
        <>
          <Reveal delay={0.08}>
            <EventsList events={result.events} />
          </Reveal>

          <EventsPagination
            currentPage={
              result.pagination.currentPage
            }
            totalPages={result.pagination.totalPages}
            totalEvents={result.pagination.totalEvents}
            pageSize={result.pagination.pageSize}
            search={search}
            status={status}
            sort={sort}
          />
        </>
      ) : (
        <EventsEmptyState
          hasFilters={hasFilters}
        />
      )}
    </div>
  );
}