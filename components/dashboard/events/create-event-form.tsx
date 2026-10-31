"use client";

import {
    useActionState,
    useEffect,
    useRef,
    useState,
} from "react";
import type { ChangeEvent } from "react";
import Link from "next/link";

import {
    ArrowLeft,
    CalendarDays,
    ImagePlus,
    Loader2,
    MapPin,
    Sparkles,
    Upload,
    X,
} from "lucide-react";

import {
    createEventAction,
    type CreateEventActionState,
} from "@/actions/events.actions";

import { useFormStatus } from "react-dom";

const initialState: CreateEventActionState = {
    status: "idle",
};

function FieldError({ message }: { message?: string }) {
    if (!message) return null;

    return (
        <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
            {message}
        </p>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Creating event...
                </>
            ) : (
                <>
                    Create event
                    <Sparkles className="ml-2 size-4" />
                </>
            )}
        </button>
    );
}

const inputClass =
    "h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 hover:border-border/90 focus:border-primary focus:ring-2 focus:ring-primary/10";

const labelClass =
    "block text-sm font-medium text-foreground";

const sectionClass =
    "overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm";

const sectionContentClass =
    "space-y-7 p-5 sm:p-7";

export function CreateEventForm() {
    const [state, formAction] = useActionState(
        createEventAction,
        initialState,
    );

    const [preview, setPreview] = useState<string | null>(null);
    const [timezoneOffset, setTimezoneOffset] = useState(0);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTimezoneOffset(new Date().getTimezoneOffset());
    }, []);

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    function handleImageChange(
        event: ChangeEvent<HTMLInputElement>,
    ) {
        const file = event.target.files?.[0];

        if (!file) {
            setPreview(null);
            return;
        }

        const nextPreview = URL.createObjectURL(file);
        setPreview(nextPreview);
    }

    function removeImage() {
        setPreview(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <div className="mx-auto w-full max-w-5xl pb-12">
            <div className="mb-7">
                <Link
                    href="/dashboard"
                    className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Back to dashboard
                </Link>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-secondary">
                        <Sparkles className="size-4" />
                        Event planning
                    </div>

                    <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        Create an event
                    </h1>

                    <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                        Bring your event to life. Add the essential
                        details and create a space for your guests to
                        respond.
                    </p>
                </div>
            </div>

            {state.message && (
                <div
                    role="alert"
                    className="mb-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    <span className="mt-0.5 size-2 shrink-0 rounded-full bg-red-500" />
                    <p>{state.message}</p>
                </div>
            )}

            <form action={formAction} className="space-y-6">
                <input
                    type="hidden"
                    name="timezoneOffset"
                    value={timezoneOffset}
                />

                {/* Event information */}
                <section className={sectionClass}>
                    <div className={sectionContentClass}>
                        <div>
                            <h2 className="text-base font-semibold">
                                Event information
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Start with the basic details of your event.
                            </p>
                        </div>

                        <div>
                            <label htmlFor="title" className={labelClass}>
                                Event title
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="e.g. Annual Product Launch"
                                maxLength={160}
                                required
                                aria-invalid={Boolean(state.fieldErrors?.title)}
                                aria-describedby={
                                    state.fieldErrors?.title
                                        ? "title-error"
                                        : undefined
                                }
                                className={`${inputClass} mt-2`}
                            />

                            <div className="mt-1.5 flex justify-between gap-3">
                                <div id="title-error">
                                    <FieldError
                                        message={state.fieldErrors?.title}
                                    />
                                </div>
                                <span className="ml-auto text-xs text-muted-foreground">
                                    Maximum 160 characters
                                </span>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className={labelClass}
                            >
                                Description
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                placeholder="Tell your guests what the event is about..."
                                rows={6}
                                maxLength={5000}
                                required
                                aria-invalid={Boolean(
                                    state.fieldErrors?.description,
                                )}
                                className="mt-2 min-h-36 w-full resize-y rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 hover:border-border/90 focus:border-primary focus:ring-2 focus:ring-primary/10"
                            />

                            <FieldError
                                message={state.fieldErrors?.description}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="location"
                                className={labelClass}
                            >
                                Event location
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <div className="relative mt-2">
                                <MapPin className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    placeholder="e.g. The Civic Centre, Lagos"
                                    maxLength={300}
                                    required
                                    aria-invalid={Boolean(
                                        state.fieldErrors?.location,
                                    )}
                                    className={`${inputClass} pl-10`}
                                />
                            </div>

                            <FieldError
                                message={state.fieldErrors?.location}
                            />
                        </div>
                    </div>
                </section>

                {/* Date and time */}
                <section className={sectionClass}>
                    <div className={sectionContentClass}>
                        <div>
                            <h2 className="text-base font-semibold">
                                Date and time
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Choose when your event will take place.
                            </p>
                        </div>

                        <div className="max-w-md">
                            <label
                                htmlFor="eventDate"
                                className={labelClass}
                            >
                                Event date and time
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <div className="relative mt-2">
                                <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                                <input
                                    id="eventDate"
                                    name="eventDate"
                                    type="datetime-local"
                                    required
                                    aria-invalid={Boolean(
                                        state.fieldErrors?.eventDate,
                                    )}
                                    className={`${inputClass} pl-10`}
                                />
                            </div>

                            <FieldError
                                message={state.fieldErrors?.eventDate}
                            />

                            <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                The selected date and time will be saved
                                using your local timezone.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Cover image */}
                <section className={sectionClass}>
                    <div className={sectionContentClass}>
                        <div>
                            <h2 className="text-base font-semibold">
                                Event cover image
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Add an image to make your event more
                                recognisable. This is optional.
                            </p>
                        </div>

                        <div>
                            <label className={labelClass}>
                                Cover image
                            </label>

                            <input
                                ref={fileInputRef}
                                id="image"
                                name="image"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleImageChange}
                                className="sr-only"
                            />

                            {preview ? (
                                <div className="mt-3 overflow-hidden rounded-xl border border-border">
                                    <div className="relative aspect-[16/7] bg-muted">
                                        <img
                                            src={preview}
                                            alt="Event cover preview"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-background px-4 py-3">
                                        <p className="text-xs text-muted-foreground">
                                            Image selected
                                        </p>

                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    fileInputRef.current?.click()
                                                }
                                                className="rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                                            >
                                                Change image
                                            </button>

                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                                            >
                                                <X className="size-3.5" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="group mt-3 flex min-h-52 w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-5 py-10 text-center transition-all hover:border-primary/50 hover:bg-primary/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    <span className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-border bg-background shadow-sm transition-transform group-hover:-translate-y-0.5">
                                        <ImagePlus className="size-5 text-muted-foreground" />
                                    </span>

                                    <span className="text-sm font-semibold">
                                        Choose an image to upload
                                    </span>

                                    <span className="mt-1 text-xs text-muted-foreground">
                                        JPEG, PNG or WebP · Up to 5MB
                                    </span>

                                    <span className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-medium shadow-sm transition-colors group-hover:bg-muted">
                                        <Upload className="size-3.5" />
                                        Browse files
                                    </span>
                                </button>
                            )}

                            <FieldError
                                message={state.fieldErrors?.image}
                            />
                        </div>
                    </div>
                </section>

                {/* Actions */}
                <div className="flex flex-col-reverse justify-end gap-3 border-t border-border/70 pt-5 sm:flex-row">
                    <Link
                        href="/dashboard/events"
                        className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        Cancel
                    </Link>

                    <SubmitButton />
                </div>
            </form>
        </div>
    );
}