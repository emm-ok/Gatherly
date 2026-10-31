"use client";

import {
    useEffect,
    useState,
    useTransition,
} from "react";

import { useRouter } from "next/navigation";

import {
    AlertTriangle,
    Loader2,
    Trash2,
    X,
} from "lucide-react";

import {
    deleteEventAction,
} from "@/actions/events.actions";

type DeleteEventDialogProps = {
    eventId: string;
    eventTitle: string;
};

export function DeleteEventDialog({
    eventId,
    eventTitle,
}: DeleteEventDialogProps) {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pending, startTransition] = useTransition();

    useEffect(() => {
        if (!open) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape" && !pending) {
                setOpen(false);
                setError(null);
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [open, pending]);

    function handleDelete() {
        setError(null);

        startTransition(async () => {
            const result = await deleteEventAction(eventId);

            if (!result.success) {
                setError(result.message);
                return;
            }

            setOpen(false);
            router.refresh();
        });
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={`Delete ${eventTitle}`}
                className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:hover:bg-red-950/30 dark:hover:text-red-400"
            >
                <Trash2 className="size-4" />
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px] animate-in fade-in duration-150"
                    onMouseDown={(event) => {
                        if (
                            event.target === event.currentTarget &&
                            !pending
                        ) {
                            setOpen(false);
                            setError(null);
                        }
                    }}
                >
                    <section
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="delete-event-title"
                        aria-describedby="delete-event-description"
                        className="w-full max-w-md animate-in zoom-in-95 slide-in-from-bottom-2 duration-200 rounded-2xl border border-border bg-card p-5 shadow-2xl sm:p-6"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-50 dark:bg-red-950/40">
                                <AlertTriangle className="size-5 text-red-600 dark:text-red-400" />
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setOpen(false);
                                    setError(null);
                                }}
                                disabled={pending}
                                aria-label="Close dialog"
                                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        <div className="mt-5">
                            <h2
                                id="delete-event-title"
                                className="text-lg font-semibold tracking-tight"
                            >
                                Delete this event?
                            </h2>

                            <p
                                id="delete-event-description"
                                className="mt-2 text-sm leading-6 text-muted-foreground"
                            >
                                You are about to permanently delete{" "}
                                <span className="font-semibold text-foreground">
                                    {eventTitle}
                                </span>
                                . Its invitations and RSVP records will
                                also be deleted. This action cannot be undone.
                            </p>
                        </div>

                        {error && (
                            <div
                                role="alert"
                                className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs leading-5 text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300"
                            >
                                {error}
                            </div>
                        )}

                        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                disabled={pending}
                                onClick={() => {
                                    setOpen(false);
                                    setError(null);
                                }}
                                className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                disabled={pending}
                                onClick={handleDelete}
                                className="inline-flex h-10 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {pending ? (
                                    <>
                                        <Loader2 className="mr-2 size-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="mr-2 size-4" />
                                        Delete event
                                    </>
                                )}
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
}