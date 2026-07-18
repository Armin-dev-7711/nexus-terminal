// src/features/auth/schemas/login.schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required to access the node.")
    .email("Please enter a valid cryptographic email network."),
  password: z
    .string()
    .min(8, "Security keys must be at least 8 characters long."),
  rememberMe: z.boolean().default(false),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
