import { SkeletonBlock } from "@/components/ui/skeleton";


export default function CreateEventLoading() {
    return (
        <div className="mx-auto max-w-5xl space-y-7 pb-12">
            <div className="space-y-3">
                <SkeletonBlock className="h-4 w-28" />
                <SkeletonBlock className="h-9 w-56" />
                <SkeletonBlock className="h-4 w-full max-w-xl" />
            </div>

            {[1, 2, 3].map((item) => (
                <section
                    key={item}
                    className="space-y-6 rounded-2xl border border-border/70 bg-card p-6"
                >
                    <SkeletonBlock className="h-6 w-44" />
                    <SkeletonBlock className="h-4 w-64" />
                    <SkeletonBlock className="h-11 w-full" />
                    <SkeletonBlock className="h-28 w-full" />
                </section>
            ))}
        </div>
    );
}