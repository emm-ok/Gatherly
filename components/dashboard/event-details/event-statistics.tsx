
import {
    Users,
    UserCheck,
    UserRoundMinus,
    UserRoundIcon,
} from "lucide-react";

import type { EventStatistics as EventStatisticsType } from "@/lib/events/event-details.types";

interface EventStatisticsProps {
    statistics: EventStatisticsType;
}

export function EventStatistics({
    statistics,
}: EventStatisticsProps) {
    const cards = [
        {
            label: "Total responses",
            value: statistics.total,
            icon: Users,
            description: "All guest responses",
            iconClass: "bg-slate-100 text-slate-700",
        },
        {
            label: "Going",
            value: statistics.going,
            icon: UserCheck,
            description: "Confirmed attendance",
            iconClass: "bg-emerald-50 text-emerald-700",
        },
        {
            label: "Maybe",
            value: statistics.maybe,
            icon: UserRoundIcon,
            description: "Undecided guests",
            iconClass: "bg-amber-50 text-amber-700",
        },
        {
            label: "Not going",
            value: statistics.notGoing,
            icon: UserRoundMinus,
            description: "Unable to attend",
            iconClass: "bg-rose-50 text-rose-700",
        },
    ];

    return (
        <section aria-label="RSVP statistics">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.label}
                            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-xs font-medium text-slate-500 sm:text-sm">
                                    {card.label}
                                </p>

                                <span
                                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${card.iconClass}`}
                                >
                                    <Icon size={17} />
                                </span>
                            </div>

                            <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                                {card.value.toLocaleString()}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                {card.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
