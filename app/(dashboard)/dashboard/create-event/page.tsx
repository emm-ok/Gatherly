import { CreateEventForm } from "@/components/dashboard/events/create-event-form";
import { Reveal } from "@/components/marketing/reveal";

export const metadata = {
  title: "Create Event | Gatherly",
  description: "Create and organise a new event.",
};

export default function CreateEventPage() {
  return (
    <Reveal>
      <CreateEventForm />
    </Reveal>
  );
}