
"use client";

import { useState, useTransition } from "react";
import {
    CalendarClock,
    CheckCircle2,
    Link2,
    ShieldCheck,
    ShieldX,
} from "lucide-react";
import { useRouter } from "next/navigation";

import type { InvitationRecord } from "@/lib/events/event-details.types";
import { revokeInvitationAction } from "@/actions/event-details.actions";
import { RevokeInvitationDialog } from "./revoke-invitation-dialog";

interface InvitationItemProps {
    eventId: string;
    invitation: InvitationRecord;
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(date);
}

export function InvitationItem({
    eventId,
    invitation,
}: InvitationItemProps) {
    const router = useRouter();

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [feedbackType, setFeedbackType] = useState<
        "success" | "error" | null
    >(null);
    const [isPending, startTransition] = useTransition();

    const isExpired =
        invitation.expiresAt !== null &&
        invitation.expiresAt.getTime() <= Date.now();

    const isActive =
        invitation.status === "ACTIVE" && !isExpired;

    async function handleRevoke() {
        startTransition(async () => {
            const result = await revokeInvitationAction(
                eventId,
                invitation.id,
            );

            setFeedback(result.message);
            setFeedbackType(result.success ? "success" : "error");

            if (result.success) {
                setShowConfirmation(false);
                router.refresh();
            }
        });
    }

    return (
        <article className="rounded-xl border border-slate-200 p-3.5 transition-colors hover:border-slate-300">
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        <Link2 size={16} />
                    </span>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                            Invitation link
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                            Created {formatDate(invitation.createdAt)}
                        </p>
                    </div>
                </div>

                <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : isExpired
                                ? "bg-amber-50 text-amber-700"
                                : "bg-slate-100 text-slate-500"
                        }`}
                >
                    {isActive ? (
                        <ShieldCheck size={11} />
                    ) : isExpired ? (
                        <CalendarClock size={11} />
                    ) : (
                        <ShieldX size={11} />
                    )}

                    {isActive
                        ? "Active"
                        : isExpired
                            ? "Expired"
                            : "Revoked"}
                </span>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                <p className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-800">
                        {invitation.rsvpCount}
                    </span>{" "}
                    {invitation.rsvpCount === 1 ? "response" : "responses"}
                </p>

                {isActive && (
                    <button
                        type="button"
                        onClick={() => setShowConfirmation(true)}
                        className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                    >
                        Revoke link
                    </button>
                )}
            </div>

            {feedback && (
                <p
                    aria-live="polite"
                    className={`mt-2 flex items-center gap-1.5 text-xs ${feedbackType === "success"
                            ? "text-emerald-700"
                            : "text-rose-600"
                        }`}
                >
                    {feedbackType === "success" && (
                        <CheckCircle2 size={13} />
                    )}
                    {feedback}
                </p>
            )}

            {showConfirmation && (
                <RevokeInvitationDialog
                    isPending={isPending}
                    onCancel={() => setShowConfirmation(false)}
                    onConfirm={handleRevoke}
                />
            )}
        </article>
    );
}
