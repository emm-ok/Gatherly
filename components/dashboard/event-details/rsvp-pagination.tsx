
import Link from "next/link";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import type { RSVPQuery } from "@/lib/events/event-details.types";

interface RSVPPaginationProps {
    eventId: string;
    filters: RSVPQuery;
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
}

export function RSVPPagination({
    eventId,
    filters,
    pagination,
}: RSVPPaginationProps) {
    const { page, pageSize, total, totalPages } = pagination;

    if (totalPages <= 1) return null;

    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, total);

    function getPageUrl(nextPage: number) {
        const params = new URLSearchParams();

        if (filters.search) params.set("q", filters.search);
        if (filters.status !== "ALL") {
            params.set("status", filters.status);
        }
        if (filters.sort !== "NEWEST") {
            params.set("sort", filters.sort);
        }

        params.set("page", String(nextPage));

        return `/dashboard/events/${eventId}?${params.toString()}`;
    }

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">{start}</span>
                {" "}to{" "}
                <span className="font-semibold text-slate-700">{end}</span>
                {" "}of{" "}
                <span className="font-semibold text-slate-700">{total}</span>
                {" "}guests
            </p>

            <div className="flex items-center gap-2">
                <Link
                    href={getPageUrl(page - 1)}
                    aria-disabled={page <= 1}
                    tabIndex={page <= 1 ? -1 : 0}
                    className={`inline-flex h-9 items-center gap-1 rounded-lg border px-3 text-xs font-medium transition-colors ${page <= 1
                            ? "pointer-events-none border-slate-100 text-slate-300"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                >
                    <ChevronLeft size={14} />
                    Previous
                </Link>

                <span className="px-2 text-xs font-medium text-slate-500">
                    Page {page} of {totalPages}
                </span>

                <Link
                    href={getPageUrl(page + 1)}
                    aria-disabled={page >= totalPages}
                    tabIndex={page >= totalPages ? -1 : 0}
                    className={`inline-flex h-9 items-center gap-1 rounded-lg border px-3 text-xs font-medium transition-colors ${page >= totalPages
                            ? "pointer-events-none border-slate-100 text-slate-300"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                >
                    Next
                    <ChevronRight size={14} />
                </Link>
            </div>
        </div>
    );
}
