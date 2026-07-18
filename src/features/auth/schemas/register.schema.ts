// src/features/auth/schemas/register.schema.ts
import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Operational name must be at least 3 characters."),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters.")
      .max(15, "Username cannot exceed 15 characters.")
      .regex(/^[a-zA-Z0-9_]+$/, "Only alphanumeric and underscores allowed.")
      .optional()
      .or(z.literal("")),
    email: z
      .string()
      .min(1, "Network mail node is required.")
      .email("Invalid cryptographic email format."),
    password: z.string().min(8, "Master key must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Please repeat your master key."),

    acceptTerms: z.literal(true, {
      message: "You must ratify the Nexus Terminal Protocol.",
    }),
    newsletter: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Security encryption keys do not match.",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
