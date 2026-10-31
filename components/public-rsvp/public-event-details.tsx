import Image from "next/image";
import {
    CalendarDays,
    Clock3,
    MapPin,
    Sparkles,
} from "lucide-react";

import type { PublicEventData } from "@/lib/events/public-rsvp.service";

import { PublicEventDate } from "./public-event-date";

interface PublicEventDetailsProps {
    event: PublicEventData;
}

export function PublicEventDetails({
    event,
}: PublicEventDetailsProps) {
    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-violet-100 via-slate-100 to-indigo-100">
                {event.imageUrl ? (
                    <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        priority
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="flex size-16 items-center justify-center rounded-2xl bg-white/80 text-violet-600 shadow-sm backdrop-blur-sm">
                            <Sparkles size={30} strokeWidth={1.4} />
                        </span>
                        <p className="mt-3 text-xs font-medium text-slate-500">
                            You're invited
                        </p>
                    </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/50 to-transparent px-5 pb-5 pt-12 sm:px-7">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                        <Sparkles size={12} />
                        You're invited
                    </span>
                </div>
            </div>

            <div className="p-5 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
                    Event invitation
                </p>

                <h1 className="mt-2 break-words text-2xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-3xl">
                    {event.title}
                </h1>

                <p className="mt-4 whitespace-pre-line break-words text-sm leading-7 text-slate-600">
                    {event.description}
                </p>

                <div className="mt-7 space-y-4 border-t border-slate-100 pt-6">
                    <div className="flex items-start gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                            <CalendarDays size={18} />
                        </span>

                        <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-400">
                                Date
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-800">
                                <PublicEventDate
                                    date={event.eventDate}
                                    format="date"
                                />
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                            <Clock3 size={18} />
                        </span>

                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Time
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-800">
                                <PublicEventDate
                                    date={event.eventDate}
                                    format="time"
                                />
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
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
        </section>
    );
}