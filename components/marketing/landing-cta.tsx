import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Reveal } from "./reveal";

export function LandingCta() {
    return (
        <section className="bg-white px-5 pb-24 sm:px-8 sm:pb-28 lg:px-10">
            <Reveal className="mx-auto max-w-7xl">
                <div className="relative isolate overflow-hidden rounded-[28px] bg-slate-950 px-6 py-16 text-center sm:px-12 sm:py-20">
                    <div
                        aria-hidden="true"
                        className="absolute -right-24 -top-40 -z-10 size-96 rounded-full bg-violet-600/30 blur-3xl"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute -bottom-48 -left-20 -z-10 size-96 rounded-full bg-indigo-500/20 blur-3xl"
                    />

                    <span className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-violet-200">
                        <CalendarDays size={23} />
                    </span>

                    <h2 className="mx-auto mt-7 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                        Your next event deserves a better plan.
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                        Start organising your events, sharing invitations,
                        and managing guest responses from one simple place.
                    </p>

                    <Link
                        href="/auth/sign-up"
                        className="group mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-50"
                    >
                        Create your free account
                        <ArrowRight
                            size={17}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>

                    <p className="mt-5 text-xs text-slate-400">
                        Get started in just a few steps.
                    </p>
                </div>
            </Reveal>
        </section>
    );
}