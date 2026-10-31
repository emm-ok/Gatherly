import {
    Clock3,
    HeartHandshake,
    LayoutDashboard,
    Sparkles,
} from "lucide-react";
import { Reveal } from "./reveal";

const benefits = [
    {
        icon: Clock3,
        title: "Spend less time organising",
        description:
            "Keep event information and guest responses together instead of managing separate messages and spreadsheets.",
    },
    {
        icon: HeartHandshake,
        title: "Make it easier for everyone",
        description:
            "Guests can open an invitation and respond directly without going through a lengthy registration process.",
    },
    {
        icon: LayoutDashboard,
        title: "Stay in control",
        description:
            "See your events, invitations, and attendance responses from one organised dashboard.",
    },
];

export function LandingBenefits() {
    return (
        <section
            id="benefits"
            aria-labelledby="benefits-heading"
            className="overflow-hidden bg-[#f8f7f5] py-24 sm:py-28"
        >
            <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-10">
                <Reveal>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
                        Designed around you
                    </span>

                    <h2
                        id="benefits-heading"
                        className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl"
                    >
                        Less time managing details. More time enjoying the
                        moment.
                    </h2>

                    <p className="mt-6 max-w-lg text-base leading-8 text-slate-600">
                        Planning an event should feel organised, not
                        overwhelming. Gatherly gives you a straightforward
                        way to manage the important details from start to
                        finish.
                    </p>

                    <div className="mt-10 space-y-8">
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;

                            return (
                                <div
                                    key={benefit.title}
                                    className="flex gap-4"
                                >
                                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-violet-100 bg-white text-violet-700 shadow-sm">
                                        <Icon size={20} strokeWidth={1.8} />
                                    </span>

                                    <div>
                                        <h3 className="text-base font-semibold text-slate-950">
                                            {benefit.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-7 text-slate-600">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Reveal>

                {/* Visual summary */}
                <Reveal delay={0.12}>
                    <div className="relative mx-auto max-w-lg">
                        <div
                            aria-hidden="true"
                            className="absolute -inset-6 rounded-[36px] bg-violet-200/30 blur-2xl"
                        />

                        <div className="relative rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.25)] sm:p-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-slate-400">
                                        YOUR EVENT OVERVIEW
                                    </p>
                                    <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
                                        Everything organised.
                                    </h3>
                                </div>

                                <span className="flex size-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                                    <Sparkles size={21} />
                                </span>
                            </div>

                            <div className="mt-8 rounded-2xl bg-slate-950 p-6 text-white">
                                <p className="text-sm text-slate-400">
                                    Total guest responses
                                </p>
                                <div className="mt-2 flex items-end justify-between">
                                    <p className="text-4xl font-semibold tracking-tight">
                                        48
                                    </p>
                                    <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                                        Responses collected
                                    </span>
                                </div>

                                <div className="mt-6 flex h-2 overflow-hidden rounded-full bg-white/10">
                                    <span className="w-2/3 bg-emerald-400" />
                                    <span className="w-[21%] bg-amber-400" />
                                    <span className="flex-1 bg-slate-400" />
                                </div>

                                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-300">
                                    <span>32 Going</span>
                                    <span>10 Maybe</span>
                                    <span>6 Not going</span>
                                </div>
                            </div>

                            <div className="mt-5 space-y-3">
                                {[
                                    "Create your event",
                                    "Share your invitation",
                                    "Collect guest responses",
                                ].map((step, index) => (
                                    <div
                                        key={step}
                                        className="flex items-center gap-3 rounded-xl border border-slate-100 p-4"
                                    >
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-sm font-semibold text-violet-700">
                                            {index + 1}
                                        </span>
                                        <p className="text-sm font-medium text-slate-700">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}