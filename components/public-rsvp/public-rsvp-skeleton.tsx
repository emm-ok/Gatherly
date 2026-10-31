export function PublicRSVPSkeleton() {
    return (
        <main className="min-h-screen animate-pulse bg-[#f8f9fc] px-4 py-8 sm:px-6 sm:py-12">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto h-11 w-36 rounded-xl bg-slate-200" />


                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        <div className="aspect-[16/9] bg-slate-200" />

                        <div className="space-y-5 p-6">
                            <div className="h-3 w-28 rounded bg-slate-200" />
                            <div className="h-8 w-4/5 rounded bg-slate-200" />
                            <div className="h-4 w-full rounded bg-slate-100" />
                            <div className="h-4 w-3/4 rounded bg-slate-100" />

                            <div className="space-y-4 border-t border-slate-100 pt-5">
                                <div className="h-12 rounded-xl bg-slate-100" />
                                <div className="h-12 rounded-xl bg-slate-100" />
                                <div className="h-12 rounded-xl bg-slate-100" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
                        <div className="h-12 w-12 rounded-xl bg-slate-200" />
                        <div className="h-7 w-2/3 rounded bg-slate-200" />
                        <div className="h-4 w-full rounded bg-slate-100" />

                        <div className="space-y-2 pt-3">
                            <div className="h-4 w-24 rounded bg-slate-200" />
                            <div className="h-11 rounded-xl bg-slate-100" />
                        </div>

                        <div className="space-y-2">
                            <div className="h-4 w-28 rounded bg-slate-200" />
                            <div className="h-11 rounded-xl bg-slate-100" />
                        </div>

                        <div className="space-y-2">
                            <div className="h-16 rounded-xl bg-slate-100" />
                            <div className="h-16 rounded-xl bg-slate-100" />
                            <div className="h-16 rounded-xl bg-slate-100" />
                        </div>

                        <div className="h-12 rounded-xl bg-slate-200" />
                    </div>
                </div>
            </div>
        </main>
    );
}