import { EventCard } from "./event-card";

type EventsListProps = {
    events: {
        id: string;
        title: string;
        location: string;
        eventDate: Date;
        imageUrl: string | null;
        createdAt: Date;
        _count: {
            rsvps: number;
        };
    }[];
};

export function EventsList({ events }: EventsListProps) {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
}