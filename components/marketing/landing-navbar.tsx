"use client";

import Link from "next/link";
import { useState } from "react";
import {
    ArrowUpRight,
    CalendarDays,
    Menu,
    X,
} from "lucide-react";

const navigation = [
    { label: "Features", href: "#features" },
    { label: "Benefits", href: "#benefits" },
    { label: "How it works", href: "#how-it-works" },
];

export function LandingNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
            <nav
                aria-label="Main navigation"
                className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
            >
                {/* Brand */}
                <Link
                    href="/"
                    aria-label="Gatherly home"
                    className="group flex items-center gap-2.5"
                >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-slate-950 text-white transition-transform duration-300 group-hover:rotate-[-5deg]">
                        <CalendarDays size={21} strokeWidth={1.8} />
                    </span>

                    <span className="text-xl font-bold tracking-tight text-slate-950">
                        Gatherly
                    </span>
                </Link>

                {/* Desktop navigation */}
                <div className="hidden items-center gap-9 md:flex">
                    {navigation.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop authentication */}
                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        href="/auth/sign-in"
                        className="rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
                    >
                        Sign in
                    </Link>

                    <Link
                        href="/auth/sign-up"
                        className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-800"
                    >
                        Get started
                        <ArrowUpRight
                            size={16}
                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    type="button"
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setIsOpen((previous) => !previous)}
                    className="flex size-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
                >
                    {isOpen ? <X size={21} /> : <Menu size={21} />}
                </button>
            </nav>

            {/* Mobile navigation */}
            {isOpen && (
                <div
                    id="mobile-navigation"
                    className="border-t border-slate-200 bg-white px-5 py-5 shadow-lg md:hidden"
                >
                    <div className="mx-auto flex max-w-7xl flex-col gap-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="my-3 border-t border-slate-200" />

                        <Link
                            href="/auth/sign-in"
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Sign in
                        </Link>

                        <Link
                            href="/auth/sign-up"
                            onClick={() => setIsOpen(false)}
                            className="mt-1 flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                        >
                            Create an account
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}