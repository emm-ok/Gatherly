import { SkeletonBlock } from "@/components/ui/skeleton";

function StatSkeletonBlock() {
    return (
        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-none">
            <div className="p-5 sm:p-6">
                <div className="flex justify-between">
                    <div className="space-y-3">
                        <SkeletonBlock className="h-4 w-28" />
                        <SkeletonBlock className="h-9 w-20" />
                    </div>

                    <SkeletonBlock className="size-11 rounded-xl" />
                </div>

                <SkeletonBlock className="mt-5 h-3 w-36" />
            </div>
        </div>
    );
}

function EventSkeletonBlock() {
    return (
        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-none">
            <div className="flex gap-4 p-5">
                <SkeletonBlock className="size-[76px] shrink-0 rounded-xl" />

                <div className="min-w-0 flex-1 space-y-3">
                    <SkeletonBlock className="h-4 w-40 max-w-full" />
                    <SkeletonBlock className="h-3 w-52 max-w-full" />
                    <SkeletonBlock className="h-3 w-28" />
                </div>
            </div>
        </div>
    );
}

export function OverviewSkeletonBlock() {
    return (
        <div
            className="space-y-9 pb-10"
            aria-label="Loading dashboard"
            aria-busy="true"
        >
            {/* Welcome */}
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div className="space-y-3">
                    <SkeletonBlock className="h-4 w-36" />
                    <SkeletonBlock className="h-9 w-64 max-w-full" />
                    <SkeletonBlock className="h-4 w-80 max-w-full" />
                </div>

                <SkeletonBlock className="h-11 w-36 rounded-xl" />
            </div>

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <StatSkeletonBlock key={index} />
                ))}
            </div>

            {/* Main sections */}
            <div className="grid gap-9 xl:grid-cols-[1.45fr_0.85fr]">
                <div className="space-y-5">
                    <div className="space-y-2">
                        <SkeletonBlock className="h-5 w-36" />
                        <SkeletonBlock className="h-3 w-48" />
                    </div>

                    {Array.from({ length: 3 }).map((_, index) => (
                        <EventSkeletonBlock key={index} />
                    ))}
                </div>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <SkeletonBlock className="h-5 w-40" />
                        <SkeletonBlock className="h-3 w-52" />
                    </div>

                    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-none">
                        <div className="space-y-6 p-6">
                            <SkeletonBlock className="h-9 w-20" />
                            <SkeletonBlock className="h-3 w-full rounded-full" />

                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between"
                                >
                                    <SkeletonBlock className="h-4 w-24" />
                                    <SkeletonBlock className="h-4 w-10" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom sections */}
            <div className="grid gap-9 xl:grid-cols-[1.45fr_0.85fr]">
                <div className="space-y-5">
                    <SkeletonBlock className="h-5 w-36" />
                    <EventSkeletonBlock />
                    <EventSkeletonBlock />
                </div>

                <div className="space-y-5">
                    <SkeletonBlock className="h-5 w-44" />

                    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-none">
                        <div className="space-y-5 p-5">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex gap-3"
                                >
                                    <SkeletonBlock className="size-9 rounded-full" />

                                    <div className="flex-1 space-y-2">
                                        <SkeletonBlock className="h-3 w-32" />
                                        <SkeletonBlock className="h-3 w-44 max-w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}