import { FrontendPlannerAgent } from "../agents/frontend-planner/FrontendPlannerAgent";
import { WorkflowStateType } from "../graph/workflow-state";

export async function FrontendNode(
    state: WorkflowStateType
) {
    const frontendPlanner =
        new FrontendPlannerAgent();

    const frontendPlan =
        await frontendPlanner.generateFrontendPlan({
            brd: state.brd!,
            architecture: state.architecture!,
            databaseDesign: state.databaseDesign!,
        });

    return {
        frontendPlan,
        workflowLogs: [
            "Frontend plan generated",
        ],
    };
}