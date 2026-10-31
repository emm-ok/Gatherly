"use client";

import { useEffect, useState } from "react";

type EventDateTimeProps = {
    date: Date;
    type: "date" | "time";
};

function formatDate(date: Date, type: "date" | "time", timeZone: string) {
    return new Intl.DateTimeFormat("en", {
        ...(type === "date"
            ? {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
            }
            : {
                hour: "numeric",
                minute: "2-digit",
            }),
        timeZone,
    }).format(date);
}

export function EventDateTime({
    date,
    type,
}: EventDateTimeProps) {
    const [timeZone, setTimeZone] = useState("UTC");

    useEffect(() => {
        setTimeZone(
            Intl.DateTimeFormat().resolvedOptions().timeZone,
        );
    }, []);

    return (
        <time dateTime={date.toISOString()}>
            {formatDate(date, type, timeZone)}
        </time>
    );
}