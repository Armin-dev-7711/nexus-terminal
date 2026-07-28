// // src/features/settings/actions/upload.actions.ts
// "use server";

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import { randomUUID } from "crypto";

// // اتصال به S3 (پشتیبانی از AWS، لیارا، Cloudflare R2 و ...)
// const s3 = new S3Client({
//   region: process.env.S3_REGION || "us-east-1",
//   endpoint: process.env.S3_ENDPOINT, // برای سرویس‌های غیر AWS ضروری است
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY!,
//     secretAccessKey: process.env.S3_SECRET_KEY!,
//   },
// });

// export async function getPresignedUploadUrl(
//   fileType: string,
//   fileSize: number,
// ) {
//   const session = await auth.api.getSession({ headers: await headers() });
//   if (!session?.user) throw new Error("Unauthorized");

//   // محدودیت سایز در سمت سرور (۲ مگابایت)
//   if (fileSize > 2 * 1024 * 1024) throw new Error("File exceeds 2MB limit");

//   // ساخت یک اسم رندوم و یکتا برای عکس
//   const fileExtension = fileType.split("/")[1];
//   const fileName = `avatars/${session.user.id}-${randomUUID()}.${fileExtension}`;

//   const command = new PutObjectCommand({
//     Bucket: process.env.S3_BUCKET_NAME!,
//     Key: fileName,
//     ContentType: fileType,
//   });

//   // تولید لینک یک‌بار مصرف با اعتبار ۶۰ ثانیه
//   const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

//   // لینک عمومی برای نمایش عکس در آینده
//   const publicUrl = `${process.env.S3_PUBLIC_DOMAIN}/${fileName}`;

//   return { signedUrl, publicUrl };
// }

// src/features/settings/actions/upload.actions.ts
"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { randomUUID } from "crypto";

const s3 = new S3Client({
  region: process.env.S3_REGION || "ir-thr-at1",
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: true, // 🚀 این خط برای آروان‌کلود و تمام سرویس‌های S3 غیر آمازون الزامی است!
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
});

export async function getPresignedUploadUrl(
  fileType: string,
  fileSize: number,
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");

  if (fileSize > 2 * 1024 * 1024) throw new Error("File exceeds 2MB limit");

  const fileExtension = fileType.split("/")[1] || "jpg";
  const fileName = `avatars/${session.user.id}-${randomUUID()}.${fileExtension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
    ACL: "public-read",
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  // لینک عمومی برای نمایش عکس
  const publicUrl = `${process.env.S3_PUBLIC_DOMAIN}/${fileName}`;

  return { signedUrl, publicUrl };
}
