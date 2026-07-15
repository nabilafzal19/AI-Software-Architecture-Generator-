import { z } from "zod";

export const FindingSchema = z.object({
  title: z
    .string()
    .describe("Short title of the finding"),

  description: z
    .string()
    .describe("Detailed explanation of the finding"),

  severity: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
  ]),

  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe("Confidence score between 0 and 1"),
});

export const QAReviewSchema = z.object({
  consistencyChecks: z.array(
    FindingSchema
  ),

  missingRequirements: z.array(
    FindingSchema
  ),

  conflicts: z.array(
    FindingSchema
  ),

  recommendations: z.array(
    FindingSchema
  ),

  overallScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "Overall quality score of the engineering artifacts"
    ),
});

export type QAReview = z.infer<
  typeof QAReviewSchema
>;