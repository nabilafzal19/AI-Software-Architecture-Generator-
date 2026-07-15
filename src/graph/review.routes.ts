import { WorkflowStateType } from "./workflow-state";

export function routeAfterArchitectureReview(
    state: WorkflowStateType
) {
    console.log(state.architectureRetryCount)
    if (state.architectureReview?.approved) {
        return "databaseDesigner";
    }

    if (state.architectureRetryCount >= 3) {
        return "humanReview";
    }

    return "architect";
}