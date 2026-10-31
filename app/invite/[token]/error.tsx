"use client";


import { PublicRSVPError } from "@/components/public-rsvp/public-rsvp-error";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return <PublicRSVPError reset={reset} />;
}