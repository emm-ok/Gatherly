function SkeletonBlock({
    className = "",
}: {
    className?: string;
}) {
    return (
        <div
            aria-hidden="true"
            className={`animate-pulse rounded-lg bg-gray-300 ${className}`}
        />
    );
}

function EventCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-gray-200">
            <SkeletonBlock className="aspect-[16/9] w-full rounded-none" />

            <div className="space-y-4 p-5">
                <SkeletonBlock className="h-5 w-3/4" />
                <SkeletonBlock className="h-4 w-1/2" />

                <div className="grid grid-cols-2 gap-3 border-y border-border/60 py-4">
                    <SkeletonBlock className="h-8 w-full" />
                    <SkeletonBlock className="h-8 w-full" />
                </div>

                <div className="flex justify-between">
                    <SkeletonBlock className="h-4 w-24" />
                    <SkeletonBlock className="h-9 w-24 rounded-lg" />
                </div>
            </div>
        </div>
    );
}

export function EventsSkeleton() {
    return (
        <div
            role="status"
            aria-label="Loading events"
            className="space-y-7 pb-10"
        >
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div className="space-y-3">
                    <SkeletonBlock className="h-4 w-28" />
                    <SkeletonBlock className="h-9 w-48" />
                    <SkeletonBlock className="h-4 w-80 max-w-full" />
                    <SkeletonBlock className="h-3 w-32" />
                </div>

                <SkeletonBlock className="h-11 w-full rounded-xl sm:w-36" />
            </div>

            <div className="rounded-2xl border border-border/70 bg-gray-200 p-4">
                <div className="flex flex-col gap-3 lg:flex-row">
                    <SkeletonBlock className="h-10 flex-1 rounded-xl" />
                    <SkeletonBlock className="h-10 w-full rounded-xl sm:w-40" />
                    <SkeletonBlock className="h-10 w-full rounded-xl sm:w-44" />
                    <SkeletonBlock className="h-10 w-full rounded-xl sm:w-20" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <EventCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}