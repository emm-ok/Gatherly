"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
    CalendarDays,
    Clock3,
    MapPin,
    Users,
} from "lucide-react";

import { DeleteEventDialog } from "./delete-event-dialog";
import { EventDateTime } from "./event-date-time";

type EventCardProps = {
    event: {
        id: string;
        title: string;
        location: string;
        eventDate: Date;
        imageUrl: string | null;
        createdAt: Date;
        _count: {
            rsvps: number;
        };
    };
};

export function EventCard({ event }: EventCardProps) {
    const [isPast, setIsPast] = useState(false);

    useEffect(() => {
        setIsPast(event.eventDate.getTime() < Date.now());
    }, [event.eventDate]);

    return (
        <article className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg hover:shadow-black/[0.04]">
            <Link
                href={`/dashboard/events/${event.id}`}
                aria-label={`View ${event.title}`}
                className="block"
            >
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    {event.imageUrl ? (
                        <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/[0.10] via-muted to-muted">
                            <div className="flex size-14 items-center justify-center rounded-2xl border border-border/60 bg-background/80 shadow-sm">
                                <CalendarDays className="size-7 text-primary/70" />
                            </div>
                        </div>
                    )}

                    <div className="absolute left-4 top-4">
                        <span
                            className={
                                isPast
                                    ? "inline-flex items-center rounded-full border border-border/70 bg-background/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur"
                                    : "inline-flex items-center rounded-full border border-emerald-200/70 bg-emerald-50/95 px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm backdrop-blur dark:border-emerald-900 dark:bg-emerald-950/90 dark:text-emerald-300"
                            }
                        >
                            <span
                                className={`mr-1.5 size-1.5 rounded-full ${isPast
                                        ? "bg-muted-foreground"
                                        : "bg-emerald-500"
                                    }`}
                            />
                            {isPast ? "Past event" : "Upcoming"}
                        </span>
                    </div>
                </div>
            </Link>

            <div className="space-y-4 p-5">
                <div className="space-y-2">
                    <Link
                        href={`/dashboard/events/${event.id}`}
                        className="line-clamp-1 text-base font-semibold tracking-tight transition-colors hover:text-primary"
                    >
                        {event.title}
                    </Link>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="size-3.5 shrink-0" />
                        <span className="truncate">
                            {event.location}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 border-y border-border/60 py-3">
                    <div className="flex min-w-0 items-start gap-2">
                        <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                        <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">
                                Date
                            </p>

                            <p className="mt-1 truncate text-xs font-medium">
                                <EventDateTime
                                    date={event.eventDate}
                                    type="date"
                                />
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <Clock3 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Time
                            </p>

                            <p className="mt-1 text-xs font-medium">
                                <EventDateTime
                                    date={event.eventDate}
                                    type="time"
                                />
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="size-4" />
                        <span>
                            {event._count.rsvps}{" "}
                            {event._count.rsvps === 1
                                ? "response"
                                : "responses"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <DeleteEventDialog
                            eventId={event.id}
                            eventTitle={event.title}
                        />

                        <Link
                            href={`/dashboard/events/${event.id}`}
                            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground transition-all hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            View event
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}