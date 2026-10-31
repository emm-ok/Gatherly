"use client";

import { useActionState, useEffect, useState } from "react";
import {
    LoaderCircle,
    LockKeyhole,
    Send,
    UserRound,
} from "lucide-react";

import {
    PublicRSVPActionState,
    submitPublicRSVPAction,
} from "@/actions/public-rsvp.actions";

import { RSVPStatusOption } from "./rsvp-status-option";
import { RSVPSuccessModal } from "./rsvp-success-modal";

type RSVPChoice = "GOING" | "MAYBE" | "NOT_GOING";

interface PublicRSVPFormProps {
    token: string;
    eventTitle: string;
}

export const initialPublicRSVPState: PublicRSVPActionState = {
    status: "idle",
    message: "",
};

const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm font-medium text-slate-900 shadow-sm outline-none transition-all duration-200 placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.08)] disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-rose-300 aria-[invalid=true]:bg-rose-50/30 aria-[invalid=true]:focus:border-rose-400 aria-[invalid=true]:focus:ring-rose-500/10";

const labelClass =
    "mb-2 block text-sm font-medium text-slate-700";

export function PublicRSVPForm({
    token,
    eventTitle,
}: PublicRSVPFormProps) {
    const [state, formAction, isPending] = useActionState(
        submitPublicRSVPAction,
        initialPublicRSVPState,
    );

    const [status, setStatus] = useState<RSVPChoice | "">("");
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (state.status === "success") {
            setShowSuccess(true);
        }
    }, [state]);

    const hasSuccess = state.status === "success";

    return (
        <>
            <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)]">
                <div className="border-b border-slate-100 px-5 py-6 sm:px-7">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                        <UserRound size={21} />
                    </div>

                    <h2 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
                        RSVP to this event
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                        Please provide your details and let the organizer know whether you'll be attending.
                    </p>
                </div>

                <form
                    action={formAction}
                    onSubmit={() => setShowSuccess(false)}
                    className="space-y-5 p-5 sm:p-7"
                >
                    <input
                        type="hidden"
                        name="token"
                        value={token}
                    />

                    <div>
                        <label htmlFor="guest-name" className={labelClass}>
                            Full name <span className="text-rose-500">*</span>
                        </label>

                        <input
                            id="guest-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Enter your full name"
                            maxLength={120}
                            required
                            disabled={isPending}
                            aria-invalid={Boolean(state.errors?.name)}
                            aria-describedby={
                                state.errors?.name ? "guest-name-error" : undefined
                            }
                            className={inputClass}
                        />

                        {state.errors?.name && (
                            <p
                                id="guest-name-error"
                                role="alert"
                                className="mt-1.5 text-xs font-medium text-rose-600"
                            >
                                {state.errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="guest-email" className={labelClass}>
                            Email address <span className="text-rose-500">*</span>
                        </label>

                        <input
                            id="guest-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            maxLength={320}
                            required
                            disabled={isPending}
                            aria-invalid={Boolean(state.errors?.email)}
                            aria-describedby={
                                state.errors?.email ? "guest-email-error" : undefined
                            }
                            className={inputClass}
                        />

                        {state.errors?.email && (
                            <p
                                id="guest-email-error"
                                role="alert"
                                className="mt-1.5 text-xs font-medium text-rose-600"
                            >
                                {state.errors.email}
                            </p>
                        )}
                    </div>

                    <fieldset>
                        <legend className="mb-3 text-sm font-medium text-slate-700">
                            Will you be attending?{" "}
                            <span className="text-rose-500">*</span>
                        </legend>

                        <div
                            role="radiogroup"
                            aria-label="Choose your RSVP response"
                            className="space-y-2.5"
                        >
                            {(["GOING", "MAYBE", "NOT_GOING"] as const).map(
                                (choice) => (
                                    <RSVPStatusOption
                                        key={choice}
                                        value={choice}
                                        selected={status === choice}
                                        onSelect={setStatus}
                                    />
                                ),
                            )}
                        </div>

                        <input
                            type="hidden"
                            name="status"
                            value={status}
                        />

                        {state.errors?.status && (
                            <p
                                role="alert"
                                className="mt-2 text-xs font-medium text-rose-600"
                            >
                                {state.errors.status}
                            </p>
                        )}
                    </fieldset>

                    {state.errors?.form && (
                        <div
                            role="alert"
                            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3"
                        >
                            <p className="text-sm font-medium text-rose-700">
                                {state.errors.form}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending || !status}
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white shadow-sm shadow-violet-600/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/20 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending ? (
                            <>
                                <LoaderCircle
                                    size={17}
                                    className="animate-spin"
                                />
                                Submitting response...
                            </>
                        ) : (
                            <>
                                <Send size={16} />
                                {hasSuccess ? "Update my RSVP" : "Submit RSVP"}
                            </>
                        )}
                    </button>

                    <div className="flex items-start justify-center gap-2 pt-1">
                        <LockKeyhole
                            size={14}
                            className="mt-0.5 shrink-0 text-slate-400"
                        />
                        <p className="max-w-sm text-center text-[11px] leading-5 text-slate-400">
                            Your information is securely submitted and shared with the event organizer for event management.
                        </p>
                    </div>
                </form>
            </section>

            {showSuccess && state.status === "success" && (
                <RSVPSuccessModal
                    eventTitle={eventTitle}
                    isUpdate={Boolean(state.isUpdate)}
                    status={state.responseStatus ?? "GOING"}
                    onClose={() => setShowSuccess(false)}
                />
            )}
        </>
    );
}