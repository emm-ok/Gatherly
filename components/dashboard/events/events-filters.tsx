"use client";

import { useState } from "react";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";

import {
    Search,
    SlidersHorizontal,
    X,
} from "lucide-react";

type EventsFiltersProps = {
    search: string;
    status: string;
    sort: string;
};

const selectClass =
    "h-10 w-full appearance-none rounded-xl border border-border bg-background px-3.5 pr-9 text-sm text-foreground outline-none transition-colors hover:border-border/90 focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-44";

export function EventsFilters({
    search,
    status,
    sort,
}: EventsFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchValue, setSearchValue] = useState(search);

    function updateParams(
        updates: Record<string, string | null>,
    ) {
        const params = new URLSearchParams(
            searchParams.toString(),
        );

        Object.entries(updates).forEach(([key, value]) => {
            if (!value) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        params.delete("page");

        const query = params.toString();

        router.push(query ? `${pathname}?${query}` : pathname);
    }

    function handleSearchSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        updateParams({
            q: searchValue.trim() || null,
        });
    }

    function clearFilters() {
        setSearchValue("");
        router.push(pathname);
    }

    const hasFilters =
        Boolean(search) ||
        status !== "all" ||
        sort !== "newest";

    return (
        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <form
                    onSubmit={handleSearchSubmit}
                    className="relative min-w-0 flex-1"
                >
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <input
                        type="search"
                        value={searchValue}
                        onChange={(event) =>
                            setSearchValue(event.target.value)
                        }
                        placeholder="Search by event name or location..."
                        className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 hover:border-border/90 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                </form>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex">
                    <div className="relative">
                        <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 z-10 size-3.5 -translate-y-1/2 text-muted-foreground" />

                        <select
                            value={status}
                            onChange={(event) =>
                                updateParams({
                                    status:
                                        event.target.value === "all"
                                            ? null
                                            : event.target.value,
                                })
                            }
                            aria-label="Filter events by status"
                            className={`${selectClass} pl-9`}
                        >
                            <option value="all">All events</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="past">Past events</option>
                        </select>
                    </div>

                    <div className="relative">
                        <select
                            value={sort}
                            onChange={(event) =>
                                updateParams({
                                    sort:
                                        event.target.value === "newest"
                                            ? null
                                            : event.target.value,
                                })
                            }
                            aria-label="Sort events"
                            className={selectClass}
                        >
                            <option value="newest">
                                Recently created
                            </option>
                            <option value="oldest">
                                Oldest created
                            </option>
                            <option value="date-asc">
                                Event date: earliest
                            </option>
                            <option value="date-desc">
                                Event date: latest
                            </option>
                        </select>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        updateParams({
                            q: searchValue.trim() || null,
                        })
                    }
                    className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    Search
                </button>
            </div>

            {hasFilters && (
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/70 pt-3">
                    <p className="text-xs text-muted-foreground">
                        Filters are applied to your event list.
                    </p>

                    <button
                        type="button"
                        onClick={clearFilters}
                        className="inline-flex h-8 items-center rounded-lg px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <X className="mr-1.5 size-3.5" />
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}