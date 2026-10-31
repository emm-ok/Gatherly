import type { ReactNode } from "react";

interface PageContainerProps {
    title: string;
    description?: string;
    action?: ReactNode;
    children: ReactNode;
}

export function PageContainer({
    title,
    description,
    action,
    children,
}: PageContainerProps) {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-[28px]">
                        {title}
                    </h1>

                    {description && (
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                            {description}
                        </p>
                    )}
                </div>

                {action && (
                    <div className="flex shrink-0 items-center gap-3">
                        {action}
                    </div>
                )}
            </div>

            {children}
        </div>
    );
}