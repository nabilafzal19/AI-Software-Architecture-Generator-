import { QAEngineerAgent } from "../agents/qa-engineer/QAEngineerAgent";
import { WorkflowStateType } from "../graph/workflow-state";

export async function QANode(
    state: WorkflowStateType
) {
    const qaEngineer = new QAEngineerAgent();

    const qaReview =
        await qaEngineer.reviewEngineeringPackage({
            designPackage: {
                brd: state.brd!,
                architecture: state.architecture!,
                databaseDesign: state.databaseDesign!,
            },
            backendPlan: state.backendPlan!,
            frontendPlan: state.frontendPlan!,
        });

    return {
        qaReview,
        workflowLogs: [
            "QA review completed",
        ],
    };
}