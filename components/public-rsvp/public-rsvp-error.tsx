"use client";


import { AlertCircle, RefreshCw } from "lucide-react";

interface PublicRSVPErrorProps {
    reset: () => void;
}

export function PublicRSVPError({
    reset,
}: PublicRSVPErrorProps) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f8f9fc] px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm sm:px-9">
                <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                    <AlertCircle size={26} />
                </span>

                <h1 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">
                    Unable to load invitation
                </h1>

                <p className="mt-2 text-sm leading-7 text-slate-500">
                    We couldn't load the invitation right now. This may be a temporary issue. Please try again.
                </p>

                <button
                    type="button"
                    onClick={reset}
                    className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-500/20"
                >
                    <RefreshCw size={15} />
                    Try again
                </button>

                <p className="mt-8 text-xs font-semibold tracking-tight text-slate-400">
                    Gatherly · Event invitations
                </p>
            </div>
        </main>
    );
}