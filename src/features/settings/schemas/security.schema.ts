import { z } from "zod";

export const securitySchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters."),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "The passwords specified do not match.",
    path: ["confirmPassword"], // ارور دقیقاً روی اینپوت تایید پسورد فعال می‌شود
  });

export type SecurityFormValues = z.infer<typeof securitySchema>;
