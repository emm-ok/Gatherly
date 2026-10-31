
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    CalendarDays,
    Clock3,
    MapPin,
} from "lucide-react";

interface EventOverviewProps {
    event: {
        title: string;
        description: string;
        location: string;
        eventDate: Date;
        imageUrl: string | null;
        createdAt: Date;
    };
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
}

function formatTime(date: Date) {
    return new Intl.DateTimeFormat("en", {
        hour: "numeric",
        minute: "2-digit",
    }).format(date);
}

export function EventOverview({ event }: EventOverviewProps) {
    const [isPast, setIsPast] = useState(false);

    useEffect(() => {
        setIsPast(event.eventDate.getTime() < Date.now());
    }, [event.eventDate]);

    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
                <div className="flex min-w-0 flex-col justify-center p-6 sm:p-8">
                    <div className="mb-5 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                            Event overview
                        </span>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${isPast
                                    ? "bg-slate-100 text-slate-600"
                                    : "bg-emerald-50 text-emerald-700"
                                }`}
                        >
                            {isPast ? "Past event" : "Upcoming event"}
                        </span>
                    </div>

                    <p className="max-w-2xl whitespace-pre-line text-sm leading-7 text-slate-600">
                        {event.description || "No event description provided."}
                    </p>

                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                        <div className="flex items-start gap-3">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                                <CalendarDays size={18} />
                            </span>

                            <div className="min-w-0">
                                <p className="text-xs font-medium text-slate-400">
                                    Event date
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    {formatDate(event.eventDate)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                                <Clock3 size={18} />
                            </span>

                            <div>
                                <p className="text-xs font-medium text-slate-400">
                                    Start time
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    {formatTime(event.eventDate)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 sm:col-span-2">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                                <MapPin size={18} />
                            </span>

                            <div className="min-w-0">
                                <p className="text-xs font-medium text-slate-400">
                                    Location
                                </p>
                                <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                                    {event.location}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative min-h-[220px] bg-slate-100 lg:min-h-[320px]">
                    {event.imageUrl ? (
                        <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            unoptimized
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-slate-50 to-slate-100">
                            <CalendarDays
                                size={42}
                                strokeWidth={1.2}
                                className="text-violet-300"
                            />
                            <p className="mt-3 text-sm font-medium text-slate-400">
                                No event image
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
