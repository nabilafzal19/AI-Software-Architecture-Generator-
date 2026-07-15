import { v4 as uuid } from "uuid";

import { BusinessAnalystAgent } from "../agents/business-analyst/BusinessAnalystAgent";
import { WorkflowStateType } from "../graph/workflow-state";


import { memoryService } from "../memory";

const businessAnalyst =
    new BusinessAnalystAgent();


export async function GenerateBRDNode(
    state: WorkflowStateType
) {

    // -----------------------------
    // Search similar BRDs
    // -----------------------------

    const previousProjects =
        await memoryService.searchProjects(
            "business-analyst-memory",
            state.project!.idea
        );

    const previousBrds =
        previousProjects
            .map(project => project.content)
            .join(
                "\n\n---------------------------------\n\n"
            );

    // -----------------------------
    // Generate BRD
    // -----------------------------

    const brd =
        await businessAnalyst.generateBRD(
            state.project!,
            previousBrds
        );

    // -----------------------------
    // Store generated BRD
    // -----------------------------

    await memoryService.storeProject(
        "business-analyst-memory",
        {

            id: uuid(),

            projectId:
                state.project!.id,

            idea:
                state.project!.idea,

            content:
                JSON.stringify(
                    brd,
                    null,
                    2
                ),

            domain:
                state.project!.domain,

            subcategory:
                state.project!.subcategory,

            createdAt:
                new Date()
                    .toISOString(),

        }
    );

    return {

        brd,

        workflowLogs: [
            "BRD generated"
        ]

    };

}