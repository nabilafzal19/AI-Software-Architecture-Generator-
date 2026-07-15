import { BackendEngineerAgent } from "../agents/backend-engineer/BackendEngineerAgent";
import { WorkflowStateType } from "../graph/workflow-state";

export async function BackendNode(
    state: WorkflowStateType
) {
    const backendEngineer =
        new BackendEngineerAgent();

    const backendPlan =
        await backendEngineer.generateImplementationPlan({
            brd: state.brd!,
            architecture: state.architecture!,
            databaseDesign: state.databaseDesign!,
        });

    return {
        backendPlan,
        workflowLogs: [
            "Backend plan generated",
        ],
    };
}