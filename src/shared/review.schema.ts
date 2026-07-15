import { z } from "zod";

export const ReviewSchema = z.object({
  approved: z.boolean(),

  confidence: z
    .number()
    .min(0)
    .max(1),

  severity: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
  ]),

  strengths: z.array(z.string()),

  issues: z.array(z.string()),

  feedback: z.string(),
});

export type Review = z.infer<
  typeof ReviewSchema
>;