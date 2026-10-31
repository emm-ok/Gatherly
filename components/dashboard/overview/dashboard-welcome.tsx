import Link from "next/link";
import { Plus } from "lucide-react";

interface DashboardWelcomeProps {
    name: string | null;
}

export function DashboardWelcome({
    name,
}: DashboardWelcomeProps) {
    const firstName = name?.trim().split(/\s+/)[0] || "there";

    const currentDate = new Intl.DateTimeFormat("en", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date());

    return (
        <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">
                    {currentDate}
                </p>

                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                    Welcome back, {firstName}
                    <span aria-hidden="true">.</span>
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                    Here&apos;s an overview of your events and guest activity.
              </p>
            </div>

            <Link
                href="/dashboard/create-event"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 sm:w-auto"
            >
                <Plus size={17} />
                Create event
            </Link>
        </section>
    );
}