
"use client";

import { useActionState } from "react";
import {
    Link2,
    Plus,
    ShieldCheck,
    Ticket,
} from "lucide-react";

import {
    createInvitationAction,
} from "@/actions/event-details.actions";

import type { InvitationRecord } from "@/lib/events/event-details.types";

import { CopyInviteLink } from "./copy-invite-link";
import { InvitationItem } from "./invitation-item";

interface InvitationSectionProps {
    eventId: string;
    invitations: InvitationRecord[];
}

interface CreateInvitationState {
    status: "idle" | "success" | "error";
    message: string;
    inviteUrl?: string;
    invitationId?: string;
}

const initialInvitationState: CreateInvitationState = {
    status: "idle",
    message: "",
};

export function InvitationSection({
    eventId,
    invitations,
}: InvitationSectionProps) {
    const [state, formAction, isPending] = useActionState(
        createInvitationAction,
        initialInvitationState,
    );

    const activeCount = invitations.filter(
        (invite) =>
            invite.status === "ACTIVE" &&
            (!invite.expiresAt || invite.expiresAt.getTime() > Date.now()),
    ).length;

    return (
        <aside className="h-fit min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:sticky xl:top-6">
            <div className="border-b border-slate-100 px-5 py-5">
                <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                        <Link2 size={19} />
                    </span>

                    <div>
                        <h2 className="text-base font-semibold text-slate-950">
                            Invitation links
                        </h2>
                        <p className="mt-0.5 text-xs text-slate-500">
                            Create and manage guest access.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-5 p-5">
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                    <div className="flex items-start gap-3">
                        <ShieldCheck
                            size={18}
                            className="mt-0.5 shrink-0 text-emerald-600"
                        />

                        <div>
                            <p className="text-sm font-semibold text-slate-800">
                                Secure guest invitations
                            </p>
                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                Share a unique link with guests so they can respond without creating an account.
                            </p>
                        </div>
                    </div>

                    <form action={formAction} className="mt-4">
                        <input
                            type="hidden"
                            name="eventId"
                            value={eventId}
                        />

                        <button
                            type="submit"
                            disabled={isPending}
                            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-medium text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isPending ? (
                                <>
                                    <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Generating link...
                                </>
                            ) : (
                                <>
                                    <Plus size={16} />
                                    Generate invitation link
                                </>
                            )}
                        </button>
                    </form>

                    {state.status === "success" && state.inviteUrl && (
                        <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                                <ShieldCheck size={15} />
                                {state.message}
                            </div>

                            <CopyInviteLink inviteUrl={state.inviteUrl} />
                        </div>
                    )}

                    {state.status === "error" && (
                        <p
                            role="alert"
                            className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700"
                        >
                            {state.message}
                        </p>
                    )}
                </div>

                <div>
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold text-slate-900">
                            Recent invitations
                        </h3>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                            {activeCount} active
                        </span>
                    </div>

                    {invitations.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center">
                            <Ticket
                                size={22}
                                className="mx-auto text-slate-300"
                            />

                            <p className="mt-3 text-sm font-medium text-slate-700">
                                No invitations yet
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                Generate your first link to start collecting guest responses.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {invitations.map((invitation) => (
                                <InvitationItem
                                    key={invitation.id}
                                    eventId={eventId}
                                    invitation={invitation}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <p className="border-t border-slate-100 pt-4 text-[11px] leading-5 text-slate-400">
                    For security, invitation links are shown only when they are first generated. Store or share the link before leaving this page.
                </p>
            </div>
        </aside>
    );
}
