
import type { ReactNode } from "react";

interface EventDetailsEmptyStateProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export function EventDetailsEmptyState({
    icon,
    title,
    description,
}: EventDetailsEmptyStateProps) {
    return (
        <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-5 py-12 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
                {icon}
            </span>

            <h3 className="mt-4 text-sm font-semibold text-slate-800">
                {title}
            </h3>

            <p className="mt-1 max-w-sm text-xs leading-6 text-slate-500">
                {description}
            </p>
        </div>
    );
}
