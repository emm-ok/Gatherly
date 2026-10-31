"use client";

import { useEffect } from "react";
import Link from "next/link";

import {
    AlertCircle,
    ArrowLeft,
    RefreshCw,
} from "lucide-react";

export default function CreateEventError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Create event page error:", error);
    }, [error]);

    return (
        <div className="flex min-h-[55vh] items-center justify-center px-4">
            <div className="w-full max-w-md text-center">
                <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/40">
                    <AlertCircle className="size-6 text-red-600 dark:text-red-400" />
                </div>

                <h2 className="text-xl font-semibold tracking-tight">
                    Something went wrong
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    We couldn't load the event creation page.
                    Your existing events have not been affected.
                    Please try again.
                </p>

                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={reset}
                        className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:brightness-95"
                    >
                        <RefreshCw className="mr-2 size-4" />
                        Try again
                    </button>

                    <Link
                        href="/dashboard/events"
                        className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
                    >
                        <ArrowLeft className="mr-2 size-4" />
                        View events
                    </Link>
                </div>
            </div>
        </div>
    );
}