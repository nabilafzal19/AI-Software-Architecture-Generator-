import { z } from "zod";

export const ModuleSchema = z.object({
  name: z
    .string()
    .describe("Name of the module"),

  description: z
    .string()
    .describe("Short overview of the module"),

  responsibilities: z
    .array(z.string())
    .describe("Responsibilities handled by this module"),
});

const TechnicalConsiderationSchema = z.object({
  title: z.string(),

  description: z.string(),

  priority: z.enum([
    "HIGH",
    "MEDIUM",
    "LOW"
  ])
});

export const SystemArchitectureSchema = z.object({
  architectureStyle: z
    .string()
    .describe("Recommended high-level architecture style"),

  overview: z
    .string()
    .describe("Overall architecture summary"),

  modules: z.array(ModuleSchema),

  externalIntegrations: z
    .array(z.string())
    .describe("External systems or third-party integrations required"),

technicalConsiderations:
    z.array(TechnicalConsiderationSchema),

  risks: z
    .array(z.string())
    .describe("Potential architectural or project risks"),
});

export type Module = z.infer<typeof ModuleSchema>;

export type SystemArchitecture = z.infer<
  typeof SystemArchitectureSchema
>;