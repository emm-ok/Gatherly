import "server-only";

import { auth } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";

import { AuthenticationError } from "./auth.errors";

//   Retrieve the current Neon Auth session.
export async function getAuthSession() {
    const { data, error } = await auth.getSession();

    if (error || !data?.user || !data?.session) {
        return null;
    }

    return data;
}

//   Synchronize an authenticated Neon Auth user
//   with the application's User model.
export async function syncAuthenticatedUser(
    authUser: {
        id: string;
        name?: string | null;
        email: string;
    }
) {
    const authUserId = authUser.id;

    const email = authUser.email.trim();

    const emailNormalized = email.toLowerCase();

    const name = authUser.name?.trim() || null;

    if (!authUserId || !emailNormalized) {
        throw new Error(
            "Authenticated user information is incomplete."
        );
    }

    return prisma.user.upsert({
        where: {
            authUserId,
        },

        create: {
            authUserId,
            name,
            email,
            emailNormalized,
        },

        update: {
            name,
            email,
            emailNormalized,
        },
    });
}

//   Retrieve the authenticated application user.
//   Synchronizes the user if necessary.
export async function getAuthenticatedUser() {
    const authData = await getAuthSession();

    if (!authData) {
        return null;
    }

    return syncAuthenticatedUser({
        id: authData.user.id,
        name: authData.user.name,
        email: authData.user.email,
    });
}
//   Require an authenticated application user.
export async function requireAuthenticatedUser() {
    const user = await getAuthenticatedUser();

    if (!user) {
        throw new AuthenticationError();
    }

    return user;
}