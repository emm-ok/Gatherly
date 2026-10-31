import { RSVPStatus } from "@/lib/generated/prisma/enums";


const statusStyles: Record<
    RSVPStatus,
    { label: string; className: string }
> = {
    GOING: {
        label: "Going",
        className: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    },
    MAYBE: {
        label: "Maybe",
        className: "bg-amber-50 text-amber-700 ring-amber-600/10",
    },
    NOT_GOING: {
        label: "Not going",
        className: "bg-rose-50 text-rose-700 ring-rose-600/10",
    },
};

interface RSVPStatusBadgeProps {
    status: RSVPStatus;
}

export function RSVPStatusBadge({
    status,
}: RSVPStatusBadgeProps) {
    const config = statusStyles[status];

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${config.className}`}
        >
            <span className="size-1.5 rounded-full bg-current" />
            {config.label}
        </span>
    );
}
