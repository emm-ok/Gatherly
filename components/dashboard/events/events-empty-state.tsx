import Link from "next/link";

import {
    CalendarDays,
    SearchX,
    ArrowRight,
} from "lucide-react";

type EventsEmptyStateProps = {
    hasFilters: boolean;
};

export function EventsEmptyState({
    hasFilters,
}: EventsEmptyStateProps) {
    if (hasFilters) {
        return (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-5 py-12 text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-muted">
                    <SearchX className="size-5 text-muted-foreground" />
                </div>

                <h2 className="text-base font-semibold">
                    No matching events
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                    We couldn't find events matching your search or
                    selected filters. Try adjusting your filters.
                </p>

                <Link
                    href="/dashboard/events"
                    className="mt-5 inline-flex h-10 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
                >
                    Clear filters
                </Link>
            </div>
        );
    }

    return (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-5 py-12 text-center">
            <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-border bg-background shadow-sm">
                <CalendarDays className="size-6 text-primary/70" />
            </div>

            <h2 className="text-lg font-semibold tracking-tight">
                Your events start here
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                You haven't created an event yet. Create your first
                event and start organising your guests in one place.
            </p>

            <Link
                href="/dashboard/create-event"
                className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:brightness-95"
            >
                Create your first event
                <ArrowRight className="ml-2 size-4" />
            </Link>
        </div>
    );
}