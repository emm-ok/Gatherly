"use client";

import { ArrowUpRight, CalendarCheck2 } from "lucide-react";
import { SidebarBrand } from "./sidebar-brand";
import { NavItem } from "./nav-item";
import { dashboardNavigation } from "./dashboard-navigation";

interface DashboardSidebarProps {
    onNavigate?: () => void;
}

export function DashboardSidebar({
    onNavigate,
}: DashboardSidebarProps) {
    return (
        <aside className="flex h-full w-full flex-col bg-white">
            {/* Brand */}
            <div className="flex h-[76px] shrink-0 items-center border-b border-slate-100 px-6">
                <SidebarBrand />
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-4 py-7">
                <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Workspace
                </p>

                <nav aria-label="Dashboard navigation" className="space-y-1.5">
                    {dashboardNavigation.map((item) => (
                        <NavItem
                            key={item.href}
                            {...item}
                            onNavigate={onNavigate}
                        />
                    ))}
                </nav>

                {/* Workspace card */}
                <div className="mt-10 rounded-2xl border border-violet-100 bg-[#faf9ff] p-4">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-white text-violet-700 shadow-sm">
                        <CalendarCheck2 size={18} />
                    </span>

                    <h2 className="mt-4 text-sm font-semibold text-slate-900">
                        Make every event count.
                    </h2>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                        Keep your invitations and guest responses organised
                        in one place.
                    </p>

                    <a
                        href="/dashboard/create-event"
                        onClick={onNavigate}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 transition-colors hover:text-violet-900"
                    >
                        Create an event
                        <ArrowUpRight size={14} />
                    </a>
                </div>
            </div>

            {/* Sidebar footer */}
            <div className="shrink-0 border-t border-slate-100 px-6 py-4">
                <p className="text-xs text-slate-400">
                    Gatherly Workspace
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                    Organise. Invite. Celebrate.
                </p>
            </div>
        </aside>
    );
}