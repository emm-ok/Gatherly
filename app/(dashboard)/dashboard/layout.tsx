import { Suspense } from "react";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireAuthenticatedUser } from "@/lib/auth/auth.service";
import { AuthenticationError } from "@/lib/auth/auth.errors";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <Suspense fallback={<DashboardLoading />}>
            <AuthenticatedDashboard>
                {children}
            </AuthenticatedDashboard>
        </Suspense>
    );
}

// Authentication-dependent rendering happens inside Suspense.
async function AuthenticatedDashboard({
    children,
}: {
    children: ReactNode;
}) {
    let user;

    try {
        user = await requireAuthenticatedUser();
    } catch (error) {
        if (error instanceof AuthenticationError) {
            redirect("/auth/sign-in");
        }

        throw error;
    }

    return (
        <DashboardShell
            user={{
                name: user.name,
                email: user.email,
            }}
        >
            {children}
        </DashboardShell>
    );
}

// Synchronous fallback: no authentication or database requests here.
function DashboardLoading() {
    return (
        <div className="min-h-screen bg-[#f8f9fb]">
            <div className="fixed inset-y-0 left-0 hidden w-[260px] border-r border-slate-200 bg-white p-6 lg:block">
                <div className="h-10 w-36 animate-pulse rounded-lg bg-slate-100" />

                <div className="mt-12 space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="h-11 animate-pulse rounded-xl bg-slate-100"
                        />
                    ))}
                </div>
            </div>

            <div className="lg:pl-[260px]">
                <header className="flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-6">
                    <div className="h-4 w-36 animate-pulse rounded bg-slate-100" />
                    <div className="size-9 animate-pulse rounded-full bg-slate-100" />
                </header>

                <main className="space-y-6 p-6 sm:p-9">
                    <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
                    <div className="h-4 w-72 max-w-full animate-pulse rounded bg-slate-100" />

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white"
                            />
                        ))}
                    </div>

                    <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white" />
                </main>
            </div>
        </div>
    );
}