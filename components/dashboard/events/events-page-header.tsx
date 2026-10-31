import Link from "next/link";

import {
    CalendarPlus,
    CalendarRange,
    Sparkles,
} from "lucide-react";

type EventsPageHeaderProps = {
    totalEvents: number;
};

export function EventsPageHeader({
    totalEvents,
}: EventsPageHeaderProps) {
    return (
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-secondary">
                    <CalendarRange className="size-4" />
                    Your workspace
                </div>

                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Your events
                </h1>

                <p className="max-w-xl text-sm leading-6 text-secondary">
                    Manage your events, keep track of upcoming
                    occasions, and monitor guest responses.
                </p>

                <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                    <Sparkles className="size-3.5" />
                    {totalEvents}{" "}
                    {totalEvents === 1 ? "event" : "events"} in your workspace
                </div>
            </div>

            <Link
                href="/dashboard/create-event"
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto"
            >
                <CalendarPlus className="mr-2 size-4" />
                Create event
            </Link>
        </div>
    );
}