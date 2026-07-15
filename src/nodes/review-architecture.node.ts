import { v4 as uuid } from "uuid";

import { ArchitectReviewerAgent } from "../agents/architect/ArchitectReviewerAgent";
import { WorkflowStateType } from "../graph/workflow-state";

import { memoryService } from "../memory";
import { MEMORY_COLLECTIONS } from "../memory/memory.constants";

const reviewer =
    new ArchitectReviewerAgent();

export async function ReviewArchitectureNode(
    state: WorkflowStateType
) {

    const architectureReview =
        await reviewer.reviewArchitecture({

            brd:
                state.brd!,

            architecture:
                state.architecture!

        });

    // ------------------------------------
    // NEW
    // Store only approved architectures
    // ------------------------------------

    if (architectureReview.approved) {

        await memoryService.storeProject(

            MEMORY_COLLECTIONS.ARCHITECT,

            {

                id: uuid(),

                projectId:
                    state.project!.id,

                idea:
                    state.project!.idea,

                content:
                    JSON.stringify(
                        state.architecture,
                        null,
                        2
                    ),

                domain:
                    state.project!.domain,

                subcategory:
                    state.project!.subcategory,

                createdAt:
                    new Date().toISOString(),

            }

        );

    }

    return {

        architectureReview,

        workflowLogs: [
            architectureReview.approved
                ? "Architecture approved"
                : "Architecture rejected"
        ]

    };

}