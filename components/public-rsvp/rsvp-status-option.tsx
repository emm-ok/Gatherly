"use client";

import {
    Check,
    CircleHelp,
    CircleX,
    UserCheck,
} from "lucide-react";

type RSVPChoice = "GOING" | "MAYBE" | "NOT_GOING";

interface RSVPStatusOptionProps {
    value: RSVPChoice;
    selected: boolean;
    onSelect: (value: RSVPChoice) => void;
}

const choices = {
    GOING: {
        title: "Yes, I'll be there",
        description: "I'm looking forward to attending.",
        icon: UserCheck,
        selectedClass:
            "border-emerald-400 bg-emerald-50/70 ring-2 ring-emerald-500/10",
        iconClass: "bg-emerald-100 text-emerald-700",
    },
    MAYBE: {
        title: "Maybe",
        description: "I'm still deciding.",
        icon: CircleHelp,
        selectedClass:
            "border-amber-400 bg-amber-50/70 ring-2 ring-amber-500/10",
        iconClass: "bg-amber-100 text-amber-700",
    },
    NOT_GOING: {
        title: "Can't make it",
        description: "Unfortunately, I won't be attending.",
        icon: CircleX,
        selectedClass:
            "border-rose-400 bg-rose-50/70 ring-2 ring-rose-500/10",
        iconClass: "bg-rose-100 text-rose-700",
    },
};

export function RSVPStatusOption({
    value,
    selected,
    onSelect,
}: RSVPStatusOptionProps) {
    const choice = choices[value];
    const Icon = choice.icon;

    return (
        <button
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(value)}
            className={`group flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                selected
                    ? choice.selectedClass
                    : "border-slate-200 bg-white hover:border-slate-300"
            }`}
        >
            <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors ${choice.iconClass}`}
            >
                <Icon size={19} />
            </span>

            <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-slate-900">
                    {choice.title}
                </span>
                <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                    {choice.description}
                </span>
            </span>

            <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                    selected
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-300 text-transparent"
                }`}
            >
                <Check size={12} strokeWidth={2.5} />
            </span>
        </button>
    );
}