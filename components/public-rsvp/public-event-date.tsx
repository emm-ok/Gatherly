"use client";

import { useEffect, useState } from "react";

interface PublicEventDateProps {
    date: Date;
    format: "date" | "time";
}

function formatEventDate(
    date: Date,
    format: "date" | "time",
    useUTC: boolean,
) {
    const options: Intl.DateTimeFormatOptions =
        format === "date"
            ? {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            }
            : {
                hour: "numeric",
                minute: "2-digit",
                timeZoneName: "short",
            };

    if (useUTC) {
        options.timeZone = "UTC";
    }

    return new Intl.DateTimeFormat("en", options).format(date);
}

export function PublicEventDate({
    date,
    format,
}: PublicEventDateProps) {
    const [display, setDisplay] = useState(() =>
        formatEventDate(date, format, true),
    );

    useEffect(() => {
        setDisplay(formatEventDate(date, format, false));
    }, [date, format]);

    return (
        <time dateTime={date.toISOString()}>
            {display}
        </time>
    );
}