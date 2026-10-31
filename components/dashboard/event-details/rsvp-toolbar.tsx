
"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import type { RSVPQuery } from "@/lib/events/event-details.types";

interface RSVPToolbarProps {
    eventId: string;
    filters: RSVPQuery;
}

export function RSVPToolbar({
    eventId,
    filters,
}: RSVPToolbarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(filters.search);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setSearch(filters.search);
    }, [filters.search]);

    function updateFilters(
        updates: Record<string, string>,
    ) {
        const params = new URLSearchParams(searchParams.toString());

        for (const [key, value] of Object.entries(updates)) {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        }

        // Every filter change returns to the first page.
        params.delete("page");

        const query = params.toString();

        startTransition(() => {
            router.push(
                query ? `${pathname}?${query}` : pathname,
                { scroll: false },
            );
        });
    }

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        updateFilters({
            q: search.trim(),
        });
    }

    function clearFilters() {
        setSearch("");

        startTransition(() => {
            router.push(pathname, { scroll: false });
        });
    }

    const hasFilters =
        filters.search !== "" ||
        filters.status !== "ALL" ||
        filters.sort !== "NEWEST";

    return (
        <div className="space-y-3">
            <form
                onSubmit={handleSearch}
                className="flex flex-col gap-2 sm:flex-row"
            >
                <div className="relative min-w-0 flex-1">
                    <Search
                        size={17}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search guests by name or email..."
                        maxLength={100}
                        aria-label="Search guests"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Search size={15} />
                    Search
                </button>
            </form>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                    <SlidersHorizontal
                        size={15}
                        className="shrink-0 text-slate-400"
                    />

                    <select
                        value={filters.status}
                        onChange={(event) =>
                            updateFilters({ status: event.target.value })
                        }
                        aria-label="Filter by RSVP status"
                        className="h-10 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 sm:flex-none"
                    >
                        <option value="ALL">All responses</option>
                        <option value="GOING">Going</option>
                        <option value="MAYBE">Maybe</option>
                        <option value="NOT_GOING">Not going</option>
                    </select>

                    <select
                        value={filters.sort}
                        onChange={(event) =>
                            updateFilters({ sort: event.target.value })
                        }
                        aria-label="Sort guest list"
                        className="h-10 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 sm:flex-none"
                    >
                        <option value="NEWEST">Newest first</option>
                        <option value="OLDEST">Oldest first</option>
                        <option value="NAME_ASC">Name A–Z</option>
                        <option value="NAME_DESC">Name Z–A</option>
                    </select>
                </div>

                {hasFilters && (
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="inline-flex h-10 items-center justify-center gap-1.5 self-start rounded-lg px-3 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:self-auto"
                    >
                        <X size={14} />
                        Clear filters
                    </button>
                )}
            </div>

            {isPending && (
                <p className="text-xs text-slate-400" aria-live="polite">
                    Updating guest list...
                </p>
            )}
        </div>
    );
}
