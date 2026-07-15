import { z } from "zod";

export const AttributeSchema = z.object({
  name: z
    .string()
    .describe("Attribute name"),

  type: z.enum([
    "string",
    "number",
    "boolean",
    "date",
    "array",
    "object",
  ]),

  required: z.boolean(),

  description: z
    .string()
    .describe("Business meaning of the attribute"),
});

export const EntitySchema = z.object({
  name: z
    .string()
    .describe("Business entity name"),

  description: z
    .string()
    .describe("Short description of the entity"),

  attributes: z.array(AttributeSchema),
});

export const RelationshipSchema = z.object({
  source: z
    .string()
    .describe("Source entity"),

  target: z
    .string()
    .describe("Target entity"),

  type: z.enum([
    "ONE_TO_ONE",
    "ONE_TO_MANY",
    "MANY_TO_ONE",
    "MANY_TO_MANY",
  ]),

  description: z
    .string()
    .describe("Business relationship between entities"),
});

export const DatabaseDesignSchema = z.object({
  entities: z.array(EntitySchema),

  relationships: z.array(RelationshipSchema),
});

export type Attribute = z.infer<typeof AttributeSchema>;

export type Entity = z.infer<typeof EntitySchema>;

export type Relationship = z.infer<
  typeof RelationshipSchema
>;

export type DatabaseDesign = z.infer<
  typeof DatabaseDesignSchema
>;