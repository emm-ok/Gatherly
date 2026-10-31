import Link from "next/link";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { CurrentYear } from "./current-year";

const footerLinks = [
    {
        title: "Platform",
        links: [
            { label: "Features", href: "#features" },
            { label: "Benefits", href: "#benefits" },
            { label: "How it works", href: "#how-it-works" },
        ],
    },
    {
        title: "Account",
        links: [
            { label: "Sign in", href: "/auth/sign-in" },
            { label: "Create account", href: "/auth/sign-up" },
        ],
    },
];

export function LandingFooter() {
    return (
        <footer className="border-t border-slate-200 bg-[#fbfaf8]">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
                    {/* Brand information */}
                    <div className="max-w-sm">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2.5"
                        >
                            <span className="flex size-10 items-center justify-center rounded-xl bg-slate-950 text-white">
                                <CalendarDays size={21} />
                            </span>

                            <span className="text-xl font-bold tracking-tight text-slate-950">
                                Gatherly
                            </span>
                        </Link>

                        <p className="mt-5 text-sm leading-7 text-slate-600">
                            A simpler way to create events, invite guests,
                            and manage responses. Make more room for the
                            moments that matter.
                        </p>

                        <Link
                            href="/auth/sign-up"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition-colors hover:text-violet-900"
                        >
                            Get started
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>

                    {/* Footer navigation */}
                    {footerLinks.map((group) => (
                        <div key={group.title}>
                            <h2 className="text-sm font-semibold text-slate-950">
                                {group.title}
                            </h2>

                            <ul className="mt-5 space-y-4">
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-slate-600 transition-colors hover:text-slate-950"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-200 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © <CurrentYear /> Gatherly. All rights
                        reserved.
                    </p>

                    <p>
                        Made to make bringing people together simpler.
                    </p>
                </div>
            </div>
        </footer>
    );
}