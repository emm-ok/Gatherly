
export function EventDetailsSkeleton() {
    return (
        <div className="mx-auto w-full max-w-[1440px] animate-pulse space-y-8 pb-12">
            <div className="space-y-3">
                <div className="h-4 w-28 rounded bg-slate-200" />
                <div className="h-8 w-64 max-w-full rounded-lg bg-slate-200" />
                <div className="h-4 w-80 max-w-full rounded bg-slate-100" />
            </div>

            <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-5 p-6 sm:p-8">
                    <div className="h-6 w-32 rounded-full bg-slate-100" />
                    <div className="h-4 w-full rounded bg-slate-100" />
                    <div className="h-4 w-4/5 rounded bg-slate-100" />
                    <div className="grid gap-5 pt-4 sm:grid-cols-2">
                        <div className="h-12 rounded-xl bg-slate-100" />
                        <div className="h-12 rounded-xl bg-slate-100" />
                        <div className="h-12 rounded-xl bg-slate-100 sm:col-span-2" />
                    </div>
                </div>
                <div className="min-h-[220px] bg-slate-100 lg:min-h-[320px]" />
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-32 rounded-2xl border border-slate-200 bg-white"
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
                <div className="h-[520px] rounded-2xl border border-slate-200 bg-white" />
                <div className="h-[420px] rounded-2xl border border-slate-200 bg-white" />
            </div>
        </div>
    );
}
