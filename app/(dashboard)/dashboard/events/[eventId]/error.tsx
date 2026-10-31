
"use client";

import { EventDetailsErrorState } from "@/components/dashboard/event-details/event-details-error-state";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return <EventDetailsErrorState reset={reset} />;
}
