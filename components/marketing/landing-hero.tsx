import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    CalendarDays,
    Check,
    Clock3,
    MapPin,
    Users,
} from "lucide-react";
import { Reveal } from "./reveal";

export function LandingHero() {
    return (
        <section className="relative isolate overflow-hidden bg-[#fbfaf8]">
            {/* Background decoration */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    backgroundImage:
                        "radial-gradient(#d6d3d1 0.7px, transparent 0.7px)",
                    backgroundSize: "24px 24px",
                    maskImage:
                        "linear-gradient(to bottom, black, transparent 80%)",
                }}
            />

            <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 pt-20 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-32">
                {/* Hero content */}
                <Reveal className="max-w-2xl">
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-2 text-xs font-semibold tracking-wide text-violet-700">
                        <span className="size-1.5 rounded-full bg-violet-600" />
                        A better way to bring people together
                    </div>

                    <h1 className="max-w-xl text-4xl font-semibold leading-[1.12] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[64px]">
                        Plan meaningful events.
                        <span className="text-violet-600">
                            {" "}Bring everyone together.
                        </span>
                    </h1>

                    <p className="mt-7 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
                        Create events, share invitations, and keep track of
                        every response in one place. Spend less time managing
                        details and more time making memorable moments.
                    </p>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/auth/sign-up"
                            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
                        >
                            Start planning for free
                            <ArrowRight
                                size={17}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>

                        <Link
                            href="#features"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                        >
                            Explore features
                        </Link>
                    </div>

                    <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-2">
                            <Check size={16} className="text-emerald-600" />
                            Simple event creation
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <Check size={16} className="text-emerald-600" />
                            Easy guest management
                        </span>
                    </div>
                </Reveal>

                {/* Product preview */}
                <Reveal delay={0.12} className="relative mx-auto w-full max-w-[540px]">
                    <div
                        aria-hidden="true"
                        className="absolute -right-10 -top-10 size-48 rounded-full bg-violet-200/50 blur-3xl"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute -bottom-12 -left-10 size-48 rounded-full bg-indigo-200/40 blur-3xl"
                    />

                    <div className="relative rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_30px_90px_-35px_rgba(15,23,42,0.28)] sm:p-5">
                        {/* Preview header */}
                        <div className="flex items-center justify-between border-b border-slate-100 px-2 pb-4">
                            <div>
                                <p className="text-xs font-medium text-slate-400">
                                    YOUR WORKSPACE
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    Upcoming events
                                </p>
                            </div>

                            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                                All organised
                            </span>
                        </div>

                        {/* Event preview card */}
                        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                            <div className="relative flex min-h-[190px] flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-900 via-indigo-800 to-slate-900 p-6 text-white">
                                <div
                                    aria-hidden="true"
                                    className="absolute -right-10 -top-20 size-64 rounded-full border border-white/10"
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute -right-2 -top-12 size-48 rounded-full border border-white/10"
                                />

                                <div className="relative flex items-center justify-between">
                                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
                                        Featured event
                                    </span>
                                    <CalendarDays size={20} className="text-white/80" />
                                </div>

                                <div className="relative">
                                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-200">
                                        Saturday · 6:00 PM
                                    </p>
                                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                                        An Evening Together
                                    </h2>
                                    <p className="mt-1 text-sm text-white/70">
                                        A celebration worth remembering.
                                    </p>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                                            <CalendarDays size={18} />
                                        </span>
                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Date
                                            </p>
                                            <p className="mt-0.5 text-sm font-semibold text-slate-800">
                                                24 November
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                            <MapPin size={18} />
                                        </span>
                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Location
                                            </p>
                                            <p className="mt-0.5 text-sm font-semibold text-slate-800">
                                                The Grand Hall
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-5 border-t border-slate-100" />

                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex -space-x-2">
                                        {["A", "J", "M", "D"].map((initial, index) => (
                                            <span
                                                key={initial}
                                                className={`flex size-9 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ${[
                                                        "bg-violet-500",
                                                        "bg-blue-500",
                                                        "bg-emerald-600",
                                                        "bg-orange-500",
                                                    ][index]
                                                    }`}
                                            >
                                                {initial}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-slate-900">
                                            48 guests
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Responses received
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RSVP summary */}
                        <div className="mt-4 grid grid-cols-3 gap-3">
                            {[
                                {
                                    label: "Going",
                                    value: "32",
                                    color: "bg-emerald-500",
                                },
                                {
                                    label: "Maybe",
                                    value: "10",
                                    color: "bg-amber-500",
                                },
                                {
                                    label: "Declined",
                                    value: "6",
                                    color: "bg-slate-400",
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                                >
                                    <div className="flex items-center gap-1.5">
                                        <span
                                            className={`size-1.5 rounded-full ${item.color}`}
                                        />
                                        <span className="text-[11px] font-medium text-slate-500">
                                            {item.label}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Floating information card */}
                    <div className="absolute -bottom-7 -left-5 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-900/10 sm:flex">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                            <Users size={19} />
                        </span>
                        <div>
                            <p className="text-xs text-slate-400">
                                Guest responses
                            </p>
                            <p className="text-sm font-semibold text-slate-900">
                                All in one place
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}