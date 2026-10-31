import {
    CalendarPlus,
    Link2,
    UserRoundCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./reveal";

const steps: {
    number: string;
    icon: LucideIcon;
    title: string;
    description: string;
}[] = [
        {
            number: "01",
            icon: CalendarPlus,
            title: "Create your event",
            description:
                "Add your event details, choose a date and location, and create your event workspace.",
        },
        {
            number: "02",
            icon: Link2,
            title: "Share your invitations",
            description:
                "Generate invitation links and send them to the people you want to invite.",
        },
        {
            number: "03",
            icon: UserRoundCheck,
            title: "Manage responses",
            description:
                "Collect RSVPs and keep track of who is attending, considering, or unable to make it.",
        },
    ];

export function LandingHowItWorks() {
    return (
        <section
            id="how-it-works"
            aria-labelledby="how-it-works-heading"
            className="bg-white py-24 sm:py-28"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
                        A simpler process
                    </span>

                    <h2
                        id="how-it-works-heading"
                        className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl"
                    >
                        Three steps. One organised experience.
                    </h2>

                    <p className="mt-5 text-base leading-7 text-slate-600">
                        Everything you need to get your event organised and
                        keep your guests informed.
                    </p>
                </Reveal>

                <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
                    <div
                        aria-hidden="true"
                        className="absolute left-[16%] right-[16%] top-7 hidden border-t border-dashed border-slate-300 md:block"
                    />

                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <Reveal
                                key={step.number}
                                delay={index * 0.08}
                                className="relative text-center"
                            >
                                <div className="relative mx-auto flex size-16 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-700 shadow-sm">
                                    <Icon size={25} strokeWidth={1.7} />
                                </div>

                                <p className="mt-6 text-xs font-bold tracking-[0.15em] text-violet-700">
                                    STEP {step.number}
                                </p>

                                <h3 className="mt-3 text-lg font-semibold text-slate-950">
                                    {step.title}
                                </h3>

                                <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-600">
                                    {step.description}
                                </p>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}