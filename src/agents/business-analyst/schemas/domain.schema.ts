import { z } from "zod";

export const DomainSchema = z.object({
  domain: z
    .string()
    .describe("The primary business domain"),

  subcategory: z
    .string()
    .describe("The specific category inside the business domain"),

  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe("Confidence score between 0 and 1"),

  reasoning: z
    .string()
    .describe("Short explanation for the classification"),
});

export type DomainClassification = z.infer<typeof DomainSchema>;