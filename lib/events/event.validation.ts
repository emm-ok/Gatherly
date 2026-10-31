export type EventFieldErrors = {
    title?: string;
    description?: string;
    location?: string;
    eventDate?: string;
    image?: string;
};

export type CreateEventInput = {
    title: string;
    description: string;
    location: string;
    eventDate: Date;
};

export type CreateEventValidationResult =
    | {
        success: true;
        data: CreateEventInput;
    }
    | {
        success: false;
        errors: EventFieldErrors;
    };

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

export function validateEventImage(file: File | null) {
    if (!file || file.size === 0) {
        return undefined;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return "Upload a JPEG, PNG, or WebP image.";
    }

    if (file.size > MAX_IMAGE_SIZE) {
        return "Image size must not exceed 5MB.";
    }

    return undefined;
}

function parseLocalEventDate(
    value: string,
    timezoneOffset: number,
): Date | null {
    const match = value.match(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/,
    );

    if (!match) return null;

    const [, year, month, day, hour, minute] = match;

    const y = Number(year);
    const m = Number(month);
    const d = Number(day);
    const h = Number(hour);
    const min = Number(minute);

    const calendarDate = new Date(
        Date.UTC(y, m - 1, d, h, min),
    );

    if (
        calendarDate.getUTCFullYear() !== y ||
        calendarDate.getUTCMonth() !== m - 1 ||
        calendarDate.getUTCDate() !== d ||
        calendarDate.getUTCHours() !== h ||
        calendarDate.getUTCMinutes() !== min
    ) {
        return null;
    }

    // getTimezoneOffset is positive when local time is behind UTC.
    const utcTimestamp =
        Date.UTC(y, m - 1, d, h, min) +
        timezoneOffset * 60_000;

    const result = new Date(utcTimestamp);

    if (Number.isNaN(result.getTime())) {
        return null;
    }

    return result;
}

export function validateCreateEvent(
    formData: FormData,
): CreateEventValidationResult {
    const errors: EventFieldErrors = {};

    const title = String(formData.get("title") ?? "").trim();
    const description = String(
        formData.get("description") ?? "",
    ).trim();
    const location = String(
        formData.get("location") ?? "",
    ).trim();
    const eventDateValue = String(
        formData.get("eventDate") ?? "",
    );

    const timezoneOffsetValue = String(
        formData.get("timezoneOffset") ?? "",
    );

    const timezoneOffset = Number(timezoneOffsetValue);

    if (!title) {
        errors.title = "Event title is required.";
    } else if (title.length > 160) {
        errors.title = "Title cannot exceed 160 characters.";
    }

    if (!description) {
        errors.description = "Event description is required.";
    } else if (description.length > 5000) {
        errors.description =
            "Description cannot exceed 5,000 characters.";
    }

    if (!location) {
        errors.location = "Event location is required.";
    } else if (location.length > 300) {
        errors.location =
            "Location cannot exceed 300 characters.";
    }

    if (
        !timezoneOffsetValue ||
        !Number.isInteger(timezoneOffset) ||
        timezoneOffset < -840 ||
        timezoneOffset > 840
    ) {
        errors.eventDate = "Invalid timezone information.";
    } else {
        const parsedDate = parseLocalEventDate(
            eventDateValue,
            timezoneOffset,
        );

        if (!parsedDate) {
            errors.eventDate = "Enter a valid event date and time.";
        } else if (parsedDate.getTime() <= Date.now()) {
            errors.eventDate =
                "Choose a date and time in the future.";
        }
    }

    const image = formData.get("image");

    if (image instanceof File) {
        const imageError = validateEventImage(image);

        if (imageError) {
            errors.image = imageError;
        }
    }

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            errors,
        };
    }

    const eventDate = parseLocalEventDate(
        eventDateValue,
        timezoneOffset,
    );

    if (!eventDate) {
        return {
            success: false,
            errors: {
                eventDate: "Enter a valid event date and time.",
            },
        };
    }

    return {
        success: true,
        data: {
            title,
            description,
            location,
            eventDate,
        },
    };
}