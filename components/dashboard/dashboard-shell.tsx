"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";

import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";

interface DashboardShellProps {
    children: ReactNode;
    user: {
        name: string | null;
        email: string;
    };
}

export function DashboardShell({
    children,
    user,
}: DashboardShellProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    function closeSidebar() {
        setIsSidebarOpen(false);
    }

    useEffect(() => {
        if (!isSidebarOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                closeSidebar();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isSidebarOpen]);

    return (
        <div className="min-h-screen bg-[#f8f9fb]">
            {/* Desktop sidebar */}
            <div className="fixed inset-y-0 left-0 z-40 hidden w-[260px] border-r border-slate-200 bg-white lg:block">
                <DashboardSidebar />
            </div>

            {/* Mobile sidebar backdrop */}
            {isSidebarOpen && (
                <button
                    type="button"
                    aria-label="Close navigation"
                    onClick={closeSidebar}
                    className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden"
                />
            )}

            {/* Mobile sidebar drawer */}
            <aside
                aria-label="Mobile dashboard navigation"
                aria-hidden={!isSidebarOpen}
                inert={!isSidebarOpen}
                className={`fixed inset-y-0 left-0 z-50 w-[min(290px,85vw)] border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${isSidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }`}
            >
                <div className="absolute right-3 top-4 z-10">
                    <button
                        type="button"
                        aria-label="Close navigation menu"
                        onClick={closeSidebar}
                        tabIndex={isSidebarOpen ? 0 : -1}
                        className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    >
                        <X size={19} />
                    </button>
                </div>

                <DashboardSidebar onNavigate={closeSidebar} />
            </aside>

            {/* Main application */}
            <div className="min-h-screen lg:pl-[260px]">
                <DashboardHeader
                    name={user.name}
                    email={user.email}
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <main className="mx-auto w-full max-w-[1600px] px-4 py-7 sm:px-7 sm:py-9 lg:px-9">
                    {children}
                </main>
            </div>
        </div>
    );
}