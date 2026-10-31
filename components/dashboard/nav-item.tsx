"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
    label: string;
    href: string;
    icon: LucideIcon;
    exact?: boolean;
    onNavigate?: () => void;
}

export function NavItem({
    label,
    href,
    icon: Icon,
    exact = false,
    onNavigate,
}: NavItemProps) {
    const pathname = usePathname();

    const isActive = exact
        ? pathname === href
        : pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-colors duration-200 ${isActive
                    ? "bg-violet-50 text-violet-800"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
        >
            {isActive && (
                <span
                    aria-hidden="true"
                    className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-violet-600"
                />
            )}

            <Icon
                size={19}
                strokeWidth={isActive ? 2.1 : 1.8}
                className={
                    isActive
                        ? "text-violet-700"
                        : "text-slate-400 transition-colors group-hover:text-slate-700"
                }
            />

            <span>{label}</span>
        </Link>
    );
}