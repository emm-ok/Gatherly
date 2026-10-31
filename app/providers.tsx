"use client";

import { NeonAuthUIProvider } from "@neondatabase/auth-ui";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { authClient } from "@/lib/auth/client";

import type { ReactNode } from "react";

export function Providers({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();

    return (
        <NeonAuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => {
                router.refresh();
            }}
            emailOTP
            social={{
                providers: ["google"],
            }}
            redirectTo="/dashboard"
            Link={Link}
        >
            {children}
        </NeonAuthUIProvider>
    );
}