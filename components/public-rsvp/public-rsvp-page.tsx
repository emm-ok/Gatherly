import { CalendarHeart } from "lucide-react";

import type { PublicEventData } from "@/lib/events/public-rsvp.service";

import { PublicEventHeader } from "./public-event-header";
import { PublicEventDetails } from "./public-event-details";
import { PublicRSVPForm } from "./public-rsvp-form";

interface PublicRSVPPageProps {
    token: string;
    event: PublicEventData;
}

export function PublicRSVPPage({
    token,
    event,
}: PublicRSVPPageProps) {
    return (
        <main className="min-h-screen bg-[#f8f9fc] px-4 py-8 sm:px-6 sm:py-12">
            <div className="mx-auto w-full max-w-6xl">
                <PublicEventHeader />

                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.85fr)] lg:gap-8">
                    <div className="min-w-0">
                        <PublicEventDetails event={event} />

                        <div className="mt-6 hidden items-center gap-2 text-xs text-slate-400 lg:flex">
                            <CalendarHeart size={15} />
                            <span>
                                Your response helps the organizer plan this event.
                            </span>
                        </div>
                    </div>

                    <div className="min-w-0">
                        <PublicRSVPForm
                            token={token}
                            eventTitle={event.title}
                        />
                    </div>
                </div>

                <footer className="mt-12 border-t border-slate-200 pt-6 text-center">
                    <p className="text-xs text-slate-400">
                        Invitation managed securely by Gatherly.
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">
                        Your information is used to manage your response to this event.
                    </p>
                </footer>
            </div>
        </main>
    );
}