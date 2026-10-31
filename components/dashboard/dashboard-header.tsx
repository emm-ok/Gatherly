"use client";

import { Menu } from "lucide-react";
import { UserMenu } from "./user-menu";

interface DashboardHeaderProps {
    name: string | null;
    email: string;
    onMenuClick: () => void;
}

export function DashboardHeader({
    name,
    email,
    onMenuClick,
}: DashboardHeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-7 lg:px-9">
            <div className="flex min-w-0 items-center gap-3">
                <button
                    type="button"
                    aria-label="Open navigation menu"
                    onClick={onMenuClick}
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
                >
                    <Menu size={21} />
                </button>

                <div className="min-w-0">
                    <p className="hidden text-xs font-medium text-slate-400 sm:block">
                        WORKSPACE
                    </p>
                    <p className="truncate text-sm font-semibold text-slate-900 sm:mt-1">
                        Your events, organised.
                    </p>
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
                <UserMenu name={name} email={email} />
            </div>
        </header>
    );
}