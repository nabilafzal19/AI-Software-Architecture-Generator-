import { z } from "zod";

export const ServiceSchema = z.object({
  name: z
    .string()
    .describe("Service name"),

  responsibility: z
    .string()
    .describe("Primary responsibility of the service"),

  modules: z
    .array(z.string())
    .describe("Architecture modules implemented by this service"),
});


export const ApiEndpointSchema = z.object({
  method: z.enum([
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
  ]),

  path: z.string(),

  description: z.string(),

  service: z.string(),
});

export const BusinessRuleSchema = z.object({
  title: z.string(),

  description: z.string(),

  priority: z.enum([
    "HIGH",
    "MEDIUM",
    "LOW",
  ]),
});

export const ImplementationStepSchema =
  z.object({
    order: z.number(),

    title: z.string(),

    description: z.string(),
  });

  export const BackendImplementationPlanSchema =
  z.object({
    services: z.array(ServiceSchema),

    apiEndpoints: z.array(ApiEndpointSchema),

    businessRules: z.array(
      BusinessRuleSchema
    ),

    implementationPlan: z.array(
      ImplementationStepSchema
    ),
  });

export type BackendImplementationPlan =
  z.infer<
    typeof BackendImplementationPlanSchema
  >;