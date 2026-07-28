// src/features/auth/schemas/reset-password.schema.ts
import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Network email address is required.")
    .email("Please enter a valid cryptographic email address."),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Secret security key must be at least 8 characters long."),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your secret security key."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Security key signatures do not match.",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
