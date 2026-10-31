"use client";

import {
    Check,
    CheckCircle2,
    Clock3,
    MailCheck,
    X,
} from "lucide-react";

interface RSVPSuccessModalProps {
    eventTitle: string;
    isUpdate: boolean;
    status: "GOING" | "MAYBE" | "NOT_GOING";
    onClose: () => void;
}

const responseLabels = {
    GOING: "Going",
    MAYBE: "Maybe",
    NOT_GOING: "Not going",
};

export function RSVPSuccessModal({
    eventTitle,
    isUpdate,
    status,
    onClose,
}: RSVPSuccessModalProps) {
    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-[3px]"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="rsvp-success-title"
                aria-describedby="rsvp-success-description"
                className="w-full max-w-md animate-[dialogIn_180ms_ease-out] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            >
                <div className="relative px-6 pb-6 pt-8 text-center sm:px-8">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close confirmation"
                        className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                    >
                        <X size={18} />
                    </button>

                    <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
                        <CheckCircle2 size={32} strokeWidth={1.7} />
                    </div>

                    <h2
                        id="rsvp-success-title"
                        className="mt-7 text-xl font-semibold tracking-tight text-slate-950"
                    >
                        {isUpdate
                            ? "Your response has been updated"
                            : "Your RSVP is confirmed"}
                    </h2>

                    <p
                        id="rsvp-success-description"
                        className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500"
                    >
                        {isUpdate
                            ? "Your latest response has been saved successfully."
                            : "Thank you for responding. Your response has been successfully recorded."}
                    </p>

                    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Event
                        </p>

                        <p className="mt-1 break-words text-sm font-semibold text-slate-900">
                            {eventTitle}
                        </p>

                        <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
                            <span className="text-xs text-slate-500">
                                Your response
                            </span>

                            <span
                                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
>
                            <Check size={12} />
                            {responseLabels[status]}
                        </span>
                    </div>
                </div>

                <div className="mt-4 flex items-start gap-2 rounded-xl bg-violet-50 p-3 text-left">
                    <MailCheck
                        size={17}
                        className="mt-0.5 shrink-0 text-violet-600"
                    />
                    <p className="text-xs leading-5 text-violet-800">
                        Your response has been shared with the event organizer. Keep your invitation link if you need to update your response later.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-500/20"
                >
                    <Check size={16} />
                    Done
                </button>
            </div>
        </div>
</div >
);
}