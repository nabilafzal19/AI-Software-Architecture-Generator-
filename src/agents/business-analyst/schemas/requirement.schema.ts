import { z } from "zod";

export const RequirementSchema = z.object({
  id: z
    .string()
    .describe("Unique snake_case identifier"),

  title: z
    .string()
    .describe("Short readable title"),

  question: z
    .string()
    .describe("Question to ask the client"),

  type: z.enum([
    "string",
    "boolean",
    "number",
    "array",
    "object",
  ]),

  required: z.boolean(),
});

export const RequirementBlueprintSchema = z.object({
  requirements: z.array(RequirementSchema),
});

export type Requirement = z.infer<typeof RequirementSchema>;
export type RequirementBlueprint = z.infer<
  typeof RequirementBlueprintSchema
>;