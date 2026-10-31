import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { DashboardOverviewData } from "@/lib/dashboard/dashboard.service";

interface AttendanceSummaryProps {
    stats: DashboardOverviewData["stats"];
}

export function AttendanceSummary({
    stats,
}: AttendanceSummaryProps) {
    const total = stats.totalResponses;

    const attendance = [
        {
            label: "Going",
            value: stats.going,
            color: "bg-emerald-500",
            textColor: "text-emerald-700",
        },
        {
            label: "Maybe",
            value: stats.maybe,
            color: "bg-amber-400",
            textColor: "text-amber-700",
        },
        {
            label: "Not going",
            value: stats.notGoing,
            color: "bg-slate-400",
            textColor: "text-slate-600",
        },
    ];

    return (
        <Card className="rounded-2xl border-slate-200/80 bg-white shadow-none">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-slate-950">
                    Attendance overview
                </CardTitle>

                <p className="text-xs text-slate-500">
                    Guest response distribution across your events
                </p>
            </CardHeader>

            <CardContent className="pt-4">
                <div className="flex items-end justify-between gap-3">
                    <div>
                        <p className="text-3xl font-semibold tracking-tight text-slate-950 tabular-nums">
                            {total.toLocaleString()}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Total responses
                        </p>
                    </div>

                    <span className="text-xs font-medium text-slate-400">
                        {stats.going.toLocaleString()} confirmed
                    </span>
                </div>

                <div
                    className="mt-6 flex h-2.5 overflow-hidden rounded-full bg-slate-100"
                    role="img"
                    aria-label={`${stats.going} going, ${stats.maybe} maybe, and ${stats.notGoing} not going out of ${total} guest responses`}
                >
                    {attendance.map((item) => {
                        const percentage =
                            total > 0 ? (item.value / total) * 100 : 0;

                        return (
                            <span
                                key={item.label}
                                className={`${item.color} transition-all duration-500`}
                                style={{ width: `${percentage}%` }}
                            />
                        );
                    })}
                </div>

                <div className="mt-6 space-y-4">
                    {attendance.map((item) => {
                        const percentage =
                            total > 0
                                ? Math.round((item.value / total) * 100)
                                : 0;

                        return (
                            <div
                                key={item.label}
                                className="flex items-center justify-between gap-4"
                            >
                                <div className="flex items-center gap-2.5">
                                    <span
                                        className={`size-2 rounded-full ${item.color}`}
                                    />

                                    <span className="text-sm text-slate-600">
                                        {item.label}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-slate-400">
                                        {percentage}%
                                    </span>

                                    <span
                                        className={`w-8 text-right text-sm font-semibold tabular-nums ${item.textColor}`}
                                    >
                                        {item.value}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}