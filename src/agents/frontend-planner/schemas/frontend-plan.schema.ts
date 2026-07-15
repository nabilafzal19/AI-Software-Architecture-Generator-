import { z } from "zod";

export const ScreenSchema = z.object({
  name: z
    .string()
    .describe("Screen name"),

  purpose: z
    .string()
    .describe("Primary purpose of the screen"),

  components: z
    .array(z.string())
    .describe("Major UI components present on the screen"),

  forms: z
    .array(z.string())
    .describe("Forms available on the screen"),
});

export const UserFlowSchema = z.object({
  name: z
    .string()
    .describe("User flow name"),

  description: z
    .string()
    .describe("Short summary of the flow"),

  steps: z
    .array(z.string())
    .describe("Ordered steps followed by the user"),
});

export const SharedComponentSchema =
  z.object({
    name: z
      .string()
      .describe("Reusable UI component"),

    purpose: z
      .string()
      .describe("Why this component exists"),
  });

  export const ValidationRuleSchema =
  z.object({
    form: z.string(),

    field: z.string(),

    rule: z.string(),

    message: z.string(),
  });

  export const FrontendPlanSchema =
  z.object({
    screens: z.array(ScreenSchema),

    userFlows: z.array(UserFlowSchema),

    sharedComponents: z.array(
      SharedComponentSchema
    ),

    validationRules: z.array(
      ValidationRuleSchema
    ),
  });

export type FrontendPlan =
  z.infer<typeof FrontendPlanSchema>;