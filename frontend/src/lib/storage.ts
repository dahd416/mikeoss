/**
 * AWS S3 / S3-compatible storage for Mike document management.
 * Uses @aws-sdk/client-s3 — supports AWS S3, Cloudflare R2, MinIO, etc.
 *
 * Required env vars:
 *   AWS_REGION            — AWS region (e.g. "us-east-2") or "auto" for R2/MinIO
 *   AWS_ACCESS_KEY_ID     — Access Key ID
 *   AWS_SECRET_ACCESS_KEY  — Secret Access Key
 *   AWS_S3_BUCKET         — bucket name
 *
 * Optional:
 *   S3_ENDPOINT_URL       — custom endpoint for S3-compatible services (R2, MinIO).
 *                            Omit for standard AWS S3.
 */

import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl as awsGetSignedUrl } from "@aws-sdk/s3-request-presigner";

function getClient(): S3Client {
    const endpoint = process.env.S3_ENDPOINT_URL?.trim();
    return new S3Client({
        region: process.env.AWS_REGION?.trim() || "us-east-1",
        ...(endpoint
            ? { endpoint, forcePathStyle: true }
            : {}),
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    });
}

const BUCKET = process.env.AWS_S3_BUCKET ?? "mike";

export const storageEnabled = Boolean(
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY,
);

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

export async function uploadFile(
    key: string,
    content: ArrayBuffer,
    contentType: string,
): Promise<void> {
    const client = getClient();
    await client.send(
        new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: Buffer.from(content),
            ContentType: contentType,
        }),
    );
}

// ---------------------------------------------------------------------------
// Download
// ---------------------------------------------------------------------------

export async function downloadFile(key: string): Promise<ArrayBuffer | null> {
    if (!storageEnabled) return null;
    try {
        const client = getClient();
        const response = await client.send(
            new GetObjectCommand({ Bucket: BUCKET, Key: key }),
        );
        if (!response.Body) return null;
        const bytes = await response.Body.transformToByteArray();
        return bytes.buffer as ArrayBuffer;
    } catch {
        return null;
    }
}

// ---------------------------------------------------------------------------
// Delete
// ---------------------------------------------------------------------------

export async function deleteFile(key: string): Promise<void> {
    if (!storageEnabled) return;
    const client = getClient();
    await client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}

// ---------------------------------------------------------------------------
// Signed URL (pre-signed for temporary direct access)
// ---------------------------------------------------------------------------

export async function getSignedUrl(
    key: string,
    expiresIn = 3600,
): Promise<string | null> {
    if (!storageEnabled) return null;
    try {
        const client = getClient();
        const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
        return await awsGetSignedUrl(client, command, { expiresIn });
    } catch {
        return null;
    }
}

// ---------------------------------------------------------------------------
// Storage key helpers
// ---------------------------------------------------------------------------

export function storageKey(
    userId: string,
    docId: string,
    filename: string,
): string {
    return `documents/${userId}/${docId}/${filename}`;
}

export function pdfStorageKey(
    userId: string,
    docId: string,
    stem: string,
): string {
    return `documents/${userId}/${docId}/${stem}.pdf`;
}

export function generatedDocKey(
    userId: string,
    docId: string,
    filename: string,
): string {
    return `generated/${userId}/${docId}/${filename}`;
}
