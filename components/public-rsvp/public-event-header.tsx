import { CalendarHeart } from "lucide-react";

export function PublicEventHeader() {
    return (
        <header className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2.5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm shadow-violet-600/20">
                    <CalendarHeart size={20} strokeWidth={1.8} />
                </span>

                <div>
                    <p className="text-base font-bold tracking-tight text-slate-950">
                        Gatherly
                    </p>
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                        Event invitations
                    </p>
                </div>
            </div>
        </header>
    );
}