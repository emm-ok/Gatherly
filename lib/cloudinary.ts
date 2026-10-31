import "server-only";

import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const isConfigured = Boolean(
    cloudName && apiKey && apiSecret,
);

if (isConfigured) {
    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
    });
}

export async function uploadEventImage(file: File) {
    if (!isConfigured) {
        throw new Error(
            "Image uploads are not configured.",
        );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    return new Promise<{
        url: string;
        publicId: string;
    }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "gatherly/events",
                resource_type: "image",
                transformation: [
                    {
                        width: 1600,
                        height: 1000,
                        crop: "limit",
                        quality: "auto",
                        fetch_format: "auto",
                    },
                ],
            },
            (error, result) => {
                if (error || !result) {
                    reject(
                        error ??
                        new Error("Image upload failed."),
                    );
                    return;
                }

                resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                });
            },
        );

        uploadStream.end(buffer);
    });
}

export async function deleteEventImage(publicId: string) {
    if (!isConfigured) return;

    await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
    });
}