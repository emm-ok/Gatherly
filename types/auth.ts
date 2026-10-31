import { User } from "@/lib/generated/prisma/client";

export type AuthenticatedUser = User;

export interface AuthenticatedSession {
    user: {
        id: string;
        name: string | null;
        email: string;
    };

    session: {
        id: string;
        userId: string;
        expiresAt: Date;
    };
}