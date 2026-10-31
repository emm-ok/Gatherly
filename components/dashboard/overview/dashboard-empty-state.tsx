
import Link from "next/link";
import {
    ArrowRight,
    CalendarPlus,
    CalendarSearch,
} from "lucide-react";

interface DashboardEmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
    icon?: "calendar" | "search";
}

export function DashboardEmptyState({
    title,
    description,
    actionLabel,
    actionHref,
    icon = "calendar",
}: DashboardEmptyStateProps) {
    const Icon = icon === "search" ? CalendarSearch : CalendarPlus;

    return (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-white px-5 py-12 text-center sm:py-14">
            {/* Icon */}
            <span className="flex size-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
                <Icon size={25} strokeWidth={1.6} aria-hidden="true" />
            </span>

            {/* Content */}
            <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">
                {title}
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                {description}
            </p>

            {/* Action */}
            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className="mt-6 inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-slate-950 px-5 text-sm font-medium text-white transition-all duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                    {actionLabel}
                    <ArrowRight
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />
                </Link>
            )}
        </div>
    );
}
