
"use client";

import { Check, Copy, Link2 } from "lucide-react";
import { useState } from "react";

interface CopyInviteLinkProps {
    inviteUrl: string;
}

export function CopyInviteLink({
    inviteUrl,
}: CopyInviteLinkProps) {
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(inviteUrl);
            setCopied(true);
            setError("");

            window.setTimeout(() => {
                setCopied(false);
            }, 2500);
        } catch {
            setError("Unable to copy automatically. Select and copy the link.");
        }
    }

    return (
        <div className="space-y-2">
            <div className="flex min-w-0 items-center gap-2 rounded-xl border border-violet-200 bg-violet-50/60 p-2">
                <Link2
                    size={16}
                    className="ml-1 shrink-0 text-violet-600"
                />

                <button
                    type="button"
                    onClick={copyLink}
                    title="Click to copy invitation link"
                    className="min-w-0 flex-1 truncate text-left text-xs font-medium text-violet-800 outline-none hover:text-violet-950 focus-visible:underline"
                >
                    {inviteUrl}
                </button>

                <button
                    type="button"
                    onClick={copyLink}
                    aria-label="Copy invitation link"
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-violet-700 shadow-sm ring-1 ring-violet-200 transition-colors hover:bg-violet-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                >
                    {copied ? (
                        <Check size={16} />
                    ) : (
                        <Copy size={16} />
                    )}
                </button>
            </div>

            <p
                aria-live="polite"
                className={`text-xs ${error
                        ? "text-rose-600"
                        : copied
                            ? "text-emerald-700"
                            : "text-slate-400"
                    }`}
            >
                {error || (copied ? "Invitation link copied." : "Click the link or copy icon to copy it.")}
            </p>
        </div>
    );
}
