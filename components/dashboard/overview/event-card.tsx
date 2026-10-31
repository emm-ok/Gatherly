
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowUpRight,
    CalendarDays,
    MapPin,
    Users,
} from "lucide-react";

interface EventCardProps {
    event: {
        id: string;
        title: string;
        location: string;
        eventDate: Date;
        imageUrl: string | null;
        _count: {
            rsvps: number;
        };
    };
    showStatus?: boolean;
}

function formatEventDate(date: Date) {
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(date);
}

export function EventCard({
    event,
    showStatus = false,
}: EventCardProps) {
    const [isPast, setIsPast] = useState<boolean | null>(null);

    useEffect(() => {
        setIsPast(new Date(event.eventDate).getTime() < Date.now());
    }, [event.eventDate]);

    return (
        <article className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-200 hover:border-slate-300 hover:shadow-md hover:shadow-slate-900/[0.04]">
            <div className="flex gap-4 p-4 sm:p-5">
                {/* Event image or fallback */}
                <div className="relative size-[76px] shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-violet-100 via-indigo-50 to-slate-100">
                    {event.imageUrl ? (
                        <Image
                            src={event.imageUrl}
                            alt=""
                            fill
                            unoptimized
                            sizes="76px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-violet-600">
                            <CalendarDays
                                size={27}
                                strokeWidth={1.5}
                            />
                        </div>
                    )}
                </div>

                {/* Event information */}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-sm font-semibold text-slate-900">
                            {event.title}
                        </h3>

                        {showStatus && isPast !== null && (
                            <span
                                className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${isPast
                                        ? "border-slate-200 bg-slate-50 text-slate-500"
                                        : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                    }`}
                            >
                                {isPast ? "Past event" : "Upcoming"}
                            </span>
                        )}
                    </div>

                    {/* Date and location */}
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarDays
                                size={14}
                                className="shrink-0"
                            />
                            {formatEventDate(new Date(event.eventDate))}
                        </span>

                        <span className="inline-flex min-w-0 items-center gap-1.5">
                            <MapPin
                                size={14}
                                className="shrink-0"
                            />
                            <span className="max-w-[170px] truncate">
                                {event.location}
                            </span>
                        </span>
                    </div>

                    {/* RSVP count and event link */}
                    <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                            <Users size={14} />
                            {event._count.rsvps}{" "}
                            {event._count.rsvps === 1
                                ? "response"
                                : "responses"}
                        </span>

                        <Link
                            href={`/dashboard/events/${event.id}`}
                            aria-label={`View ${event.title}`}
                            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-violet-700 transition-colors hover:text-violet-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                        >
                            View event
                            <ArrowUpRight
                                size={14}
                                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
