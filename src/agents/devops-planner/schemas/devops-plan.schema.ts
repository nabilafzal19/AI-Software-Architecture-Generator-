import { z } from "zod";

export const InfrastructureComponentSchema = z.object({
  name: z.string(),

  purpose: z.string(),
});

export const PipelineStageSchema = z.object({
  order: z.number(),

  name: z.string(),

  description: z.string(),
});

export const EnvironmentSchema = z.object({
  name: z.string(),

  purpose: z.string(),
});

export const MonitoringItemSchema = z.object({
  metric: z.string(),

  description: z.string(),
});

export const DeploymentRiskSchema = z.object({
  title: z.string(),

  description: z.string(),

  severity: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
  ]),
});

export const DevOpsPlanSchema = z.object({
  infrastructure: z.array(
    InfrastructureComponentSchema
  ),

  deploymentPipeline: z.array(
    PipelineStageSchema
  ),

  environments: z.array(
    EnvironmentSchema
  ),

  monitoringPlan: z.array(
    MonitoringItemSchema
  ),

  deploymentRisks: z.array(
    DeploymentRiskSchema
  ),
});

export type DevOpsPlan = z.infer<
  typeof DevOpsPlanSchema
>;