import { z } from "zod";

export const FunctionalRequirementSchema = z.object({
  title: z
    .string()
    .describe("Short title of the functional requirement"),

  description: z
    .string()
    .describe("Detailed explanation of the functional requirement"),
});

export const BusinessRequirementsDocumentSchema = z.object({
  executiveSummary: z.string(),

  projectOverview: z.string(),

  businessObjectives: z.array(z.string()),

  functionalRequirements: z.array(
    FunctionalRequirementSchema
  ),

  assumptions: z.array(z.string()),

  constraints: z.array(z.string()),

  futureScope: z.array(z.string()),
});

export type BusinessRequirementsDocument =
  z.infer<typeof BusinessRequirementsDocumentSchema>;