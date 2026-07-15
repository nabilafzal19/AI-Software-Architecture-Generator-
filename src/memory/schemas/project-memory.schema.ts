import { z } from "zod";

export const ProjectMemorySchema =
    z.object({

        id: z.string(),

        projectId: z.string(),

        idea: z.string(),

        content: z.string(),

        domain: z.string(),

        subcategory: z.string(),

        createdAt: z.string(),

    });

export type ProjectMemory =
    z.infer<
        typeof ProjectMemorySchema
    >;