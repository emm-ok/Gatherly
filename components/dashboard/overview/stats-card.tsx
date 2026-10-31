import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: number;
    description: string;
    icon: LucideIcon;
    iconClassName: string;
}

export function StatCard({
    title,
    value,
    description,
    icon: Icon,
    iconClassName,
}: StatCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md hover:shadow-slate-900/[0.03] sm:p-6">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 tabular-nums">
                        {value.toLocaleString()}
                    </p>
                </div>

                <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
                >
                    <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                </span>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-500">
                {description}
            </p>
        </div>
    );
}