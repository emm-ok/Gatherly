import Link from "next/link";
import { CalendarDays } from "lucide-react";

export function SidebarBrand() {
    return (
        <Link
            href="/dashboard"
            aria-label="Gatherly dashboard"
            className="group flex items-center gap-3"
        >
            <span className="flex size-10 items-center justify-center rounded-xl bg-slate-950 text-white transition-transform duration-200 group-hover:rotate-[-5deg]">
                <CalendarDays size={21} strokeWidth={1.8} />
            </span>

            <span className="text-xl font-bold tracking-tight text-slate-950">
                Gatherly
            </span>
        </Link>
    );
}