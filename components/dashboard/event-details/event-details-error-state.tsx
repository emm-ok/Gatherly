
"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

interface EventDetailsErrorStateProps {
    reset: () => void;
}

export function EventDetailsErrorState({
    reset,
}: EventDetailsErrorStateProps) {
    return (
        <div className="flex min-h-[420px] flex-col items-center justify-center px-5 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                <AlertCircle size={25} />
            </span>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
                Something went wrong
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                We couldn't load this event. Please try again. If the problem
                continues, come back in a moment.
            </p>

            <button
                type="button"
                onClick={reset}
                className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
                <RefreshCw size={15} />
                Try again
            </button>
        </div>
    );
}
