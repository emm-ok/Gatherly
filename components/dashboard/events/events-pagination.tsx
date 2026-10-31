import Link from "next/link";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

type EventsPaginationProps = {
    currentPage: number;
    totalPages: number;
    totalEvents: number;
    pageSize: number;
    search: string;
    status: string;
    sort: string;
};

export function EventsPagination({
    currentPage,
    totalPages,
    totalEvents,
    pageSize,
    search,
    status,
    sort,
}: EventsPaginationProps) {
    if (totalPages <= 1) return null;

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalEvents);

    function getPageUrl(page: number) {
        const params = new URLSearchParams();

        if (search) params.set("q", search);
        if (status !== "all") params.set("status", status);
        if (sort !== "newest") params.set("sort", sort);

        params.set("page", String(page));

        return `/dashboard/events?${params.toString()}`;
    }

    const previousDisabled = currentPage <= 1;
    const nextDisabled = currentPage >= totalPages;

    const navigationClass =
        "inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary aria-disabled:pointer-events-none aria-disabled:opacity-40";

    return (
        <nav
            aria-label="Events pagination"
            className="flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between"
        >
            <p className="text-xs text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                    {start}–{end}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                    {totalEvents}
                </span>{" "}
                events
            </p>

            <div className="flex items-center justify-between gap-3 sm:justify-end">
                <Link
                    href={getPageUrl(currentPage - 1)}
                    aria-disabled={previousDisabled}
                    tabIndex={previousDisabled ? -1 : undefined}
                    className={navigationClass}
                >
                    <ChevronLeft className="mr-1 size-4" />
                    Previous
                </Link>

                <span className="min-w-20 text-center text-xs text-muted-foreground">
                    Page{" "}
                    <span className="font-semibold text-foreground">
                        {currentPage}
                    </span>{" "}
                    of {totalPages}
                </span>

                <Link
                    href={getPageUrl(currentPage + 1)}
                    aria-disabled={nextDisabled}
                    tabIndex={nextDisabled ? -1 : undefined}
                    className={navigationClass}
                >
                    Next
                    <ChevronRight className="ml-1 size-4" />
                </Link>
            </div>
        </nav>
    );
}