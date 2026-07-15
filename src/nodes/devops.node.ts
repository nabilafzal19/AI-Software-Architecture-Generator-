import { DevOpsPlannerAgent } from "../agents/devops-planner/DevOpsPlannerAgent";
import { WorkflowStateType } from "../graph/workflow-state";

export async function DevOpsNode(
    state: WorkflowStateType
) {
    const devopsPlanner =
        new DevOpsPlannerAgent();

    const devopsPlan =
        await devopsPlanner.generateDevOpsPlan({
            designPackage: {
                brd: state.brd!,
                architecture: state.architecture!,
                databaseDesign: state.databaseDesign!,
            },
            backendPlan: state.backendPlan!,
            frontendPlan: state.frontendPlan!,
            qaReview: state.qaReview!,
        });

    return {
        devopsPlan,
        workflowLogs: [
            "DevOps plan generated",
        ],
    };
}