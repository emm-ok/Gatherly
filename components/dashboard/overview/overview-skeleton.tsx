import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

function StatSkeleton() {
    return (
        <Card className="rounded-2xl border-slate-200/80 shadow-none">
            <CardContent className="p-5 sm:p-6">
                <div className="flex justify-between">
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-9 w-20" />
                    </div>

                    <Skeleton className="size-11 rounded-xl" />
                </div>

                <Skeleton className="mt-5 h-3 w-36" />
            </CardContent>
        </Card>
    );
}

function EventSkeleton() {
    return (
        <Card className="rounded-2xl border-slate-200/80 shadow-none">
            <CardContent className="flex gap-4 p-5">
                <Skeleton className="size-[76px] shrink-0 rounded-xl" />

                <div className="min-w-0 flex-1 space-y-3">
                    <Skeleton className="h-4 w-40 max-w-full" />
                    <Skeleton className="h-3 w-52 max-w-full" />
                    <Skeleton className="h-3 w-28" />
                </div>
            </CardContent>
        </Card>
    );
}

export function OverviewSkeleton() {
    return (
        <div
            className="space-y-9 pb-10"
            aria-label="Loading dashboard"
            aria-busy="true"
        >
            {/* Welcome */}
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div className="space-y-3">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-9 w-64 max-w-full" />
                    <Skeleton className="h-4 w-80 max-w-full" />
                </div>

                <Skeleton className="h-11 w-36 rounded-xl" />
            </div>

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <StatSkeleton key={index} />
                ))}
            </div>

            {/* Main sections */}
            <div className="grid gap-9 xl:grid-cols-[1.45fr_0.85fr]">
                <div className="space-y-5">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-36" />
                        <Skeleton className="h-3 w-48" />
                    </div>

                    {Array.from({ length: 3 }).map((_, index) => (
                        <EventSkeleton key={index} />
                    ))}
                </div>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-3 w-52" />
                    </div>

                    <Card className="rounded-2xl border-slate-200/80 shadow-none">
                        <CardContent className="space-y-6 p-6">
                            <Skeleton className="h-9 w-20" />
                            <Skeleton className="h-3 w-full rounded-full" />

                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between"
                                >
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-10" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Bottom sections */}
            <div className="grid gap-9 xl:grid-cols-[1.45fr_0.85fr]">
                <div className="space-y-5">
                    <Skeleton className="h-5 w-36" />
                    <EventSkeleton />
                    <EventSkeleton />
                </div>

                <div className="space-y-5">
                    <Skeleton className="h-5 w-44" />

                    <Card className="rounded-2xl border-slate-200/80 shadow-none">
                        <CardContent className="space-y-5 p-5">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex gap-3"
                                >
                                    <Skeleton className="size-9 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-3 w-32" />
                                        <Skeleton className="h-3 w-44 max-w-full" />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}