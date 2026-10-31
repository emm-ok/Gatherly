"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronDown,
    LogOut,
    UserRound,
} from "lucide-react";

import { authClient } from "@/lib/auth/client";

interface UserMenuProps {
    name: string | null;
    email: string;
}

function getInitials(name: string | null, email: string) {
    const value = name?.trim();

    if (value) {
        return value
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase();
    }

    return email.slice(0, 1).toUpperCase();
}

export function UserMenu({ name, email }: UserMenuProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);

    const displayName = name?.trim() || "Account";

    async function handleSignOut() {
        if (isSigningOut) return;

        setIsSigningOut(true);

        try {
            const result = await authClient.signOut();

            if (result.error) {
                throw new Error(result.error.message);
            }

            router.replace("/");
            router.refresh();
        } catch (error) {
            console.error("Sign out failed:", error);
            setIsSigningOut(false);
        }
    }

    return (
        <div className="relative">
            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((previous) => !previous)}
                className="flex items-center gap-3 rounded-xl p-1.5 text-left transition-colors hover:bg-slate-100"
            >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-800">
                    {getInitials(name, email)}
                </span>

                <span className="hidden min-w-0 text-left sm:block">
                    <span className="block max-w-36 truncate text-sm font-semibold text-slate-800">
                        {displayName}
                    </span>
                    <span className="block max-w-36 truncate text-xs text-slate-400">
                        {email}
                    </span>
                </span>

                <ChevronDown
                    size={16}
                    className={`hidden text-slate-400 transition-transform sm:block ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {isOpen && (
                <>
                    <button
                        type="button"
                        aria-label="Close account menu"
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setIsOpen(false)}
                    />

                    <div
                        role="menu"
                        className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10"
                    >
                        <div className="border-b border-slate-100 px-3 py-3">
                            <p className="truncate text-sm font-semibold text-slate-900">
                                {displayName}
                            </p>
                            <p className="mt-1 truncate text-xs text-slate-500">
                                {email}
                            </p>
                        </div>

                        <div className="py-2">
                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push("/dashboard/settings");
                                }}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950"
                            >
                                <UserRound size={17} />
                                Account settings
                            </button>

                            <button
                                type="button"
                                role="menuitem"
                                disabled={isSigningOut}
                                onClick={handleSignOut}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <LogOut size={17} />
                                {isSigningOut ? "Signing out..." : "Sign out"}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}