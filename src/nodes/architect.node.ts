import { v4 as uuid } from "uuid";

import { ArchitectAgent } from "../agents/architect/ArchitectAgent";
import { WorkflowStateType } from "../graph/workflow-state";

import { memoryService } from "../memory";
import { MEMORY_COLLECTIONS } from "../memory/memory.constants";

const architect = new ArchitectAgent();

export async function ArchitectNode(
    state: WorkflowStateType
) {

    // -----------------------------
    // Search previous architectures
    // -----------------------------

    const previousProjects =
        await memoryService.searchProjects(
            MEMORY_COLLECTIONS.ARCHITECT,
            state.project!.idea
        );

    const previousArchitectures =
        previousProjects
            .map(project => project.content)
            .join("\n\n-------------------------\n\n");

    // -----------------------------
    // Generate architecture
    // -----------------------------

    const architecture =
        await architect.designSystem({

            brd: state.brd!,

            // Memory
            previousArchitectures,

            // Reflection
            previousArchitecture:
                state.architecture,

            review:
                state.architectureReview,

        });

   
    return {

        architecture,

        architectureRetryCount:
            state.architecture
                ? state.architectureRetryCount + 1
                : 0,

        workflowLogs: [
            "Architecture generated"
        ]

    };

}