
"use client";

import { AlertTriangle, LoaderCircle, ShieldX } from "lucide-react";

interface RevokeInvitationDialogProps {
    isPending: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export function RevokeInvitationDialog({
    isPending,
    onCancel,
    onConfirm,
}: RevokeInvitationDialogProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !isPending) {
                    onCancel();
                }
            }}
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="revoke-dialog-title"
                aria-describedby="revoke-dialog-description"
                className="w-full max-w-md animate-[dialogIn_180ms_ease-out] rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            >
                <div className="flex size-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                    <AlertTriangle size={22} />
                </div>

                <h3
                    id="revoke-dialog-title"
                    className="mt-5 text-lg font-semibold tracking-tight text-slate-950"
                >
                    Revoke invitation link?
                </h3>

                <p
                    id="revoke-dialog-description"
                    className="mt-2 text-sm leading-6 text-slate-500"
                >
                    Guests will no longer be able to use this link to submit
                    an RSVP. Existing guest responses will remain unchanged.
                    This action cannot be undone.
                </p>

                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isPending}
                        className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
                    >
                        Keep invitation
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isPending}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isPending ? (
                            <>
                                <LoaderCircle
                                    size={15}
                                    className="animate-spin"
                                />
                                Revoking...
                            </>
                        ) : (
                            <>
                                <ShieldX size={15} />
                                Revoke link
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
