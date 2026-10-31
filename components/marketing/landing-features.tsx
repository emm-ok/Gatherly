import {
    CalendarPlus,
    ChartNoAxesCombined,
    Link2,
    ShieldCheck,
    Users,
    UserRoundCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./reveal";

const features: {
    icon: LucideIcon;
    title: string;
    description: string;
    iconStyle: string;
}[] = [
        {
            icon: CalendarPlus,
            title: "Effortless event creation",
            description:
                "Create and organise events with the essential details your guests need, including the date, location, description, and event image.",
            iconStyle: "bg-violet-50 text-violet-700",
        },
        {
            icon: Link2,
            title: "Shareable invitations",
            description:
                "Generate unique invitation links and share them with your guests. Create multiple invitations and manage their availability.",
            iconStyle: "bg-blue-50 text-blue-700",
        },
        {
            icon: UserRoundCheck,
            title: "Simple guest RSVPs",
            description:
                "Let guests respond to invitations without creating an account. Collect their names, email addresses, and attendance preferences.",
            iconStyle: "bg-emerald-50 text-emerald-700",
        },
        {
            icon: Users,
            title: "Centralised guest management",
            description:
                "View guest responses in one place, identify attendance preferences, and keep your guest information organised.",
            iconStyle: "bg-orange-50 text-orange-700",
        },
        {
            icon: ChartNoAxesCombined,
            title: "Clear attendance insights",
            description:
                "Understand how many guests are attending, considering, or declining through a simple RSVP summary.",
            iconStyle: "bg-indigo-50 text-indigo-700",
        },
        {
            icon: ShieldCheck,
            title: "Secure invitation access",
            description:
                "Use unique invitation tokens, optional expiration dates, and revocation controls to manage access to your event invitations.",
            iconStyle: "bg-rose-50 text-rose-700",
        },
    ];

export function LandingFeatures() {
    return (
        <section
            id="features"
            aria-labelledby="features-heading"
            className="bg-white py-24 sm:py-28"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
                        Everything in one place
                    </span>

                    <h2
                        id="features-heading"
                        className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl"
                    >
                        Everything you need to plan with confidence.
                    </h2>

                    <p className="mt-5 text-base leading-7 text-slate-600">
                        From creating your event to managing guest responses,
                        the essentials are organised in one simple workspace.
                    </p>
                </Reveal>

                <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <Reveal
                                key={feature.title}
                                delay={index * 0.045}
                                className="h-full"
                            >
                                <article className="group h-full rounded-2xl border border-slate-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_18px_45px_-25px_rgba(76,29,149,0.2)]">
                                    <span
                                        className={`flex size-12 items-center justify-center rounded-xl ${feature.iconStyle}`}
                                    >
                                        <Icon size={22} strokeWidth={1.8} />
                                    </span>

                                    <h3 className="mt-6 text-lg font-semibold tracking-tight text-slate-950">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        {feature.description}
                                    </p>
                                </article>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}