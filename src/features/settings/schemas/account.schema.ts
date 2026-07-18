import { z } from "zod";

export const accountSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please enter a valid crypto-node email address."),
});

export type AccountFormValues = z.infer<typeof accountSchema>;
