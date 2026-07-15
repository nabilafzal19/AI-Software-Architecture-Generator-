import { WorkflowStateType } from "./workflow-state";
import { BusinessAnalystAgent } from "../agents/business-analyst/BusinessAnalystAgent";

const businessAnalyst = new BusinessAnalystAgent();

export function routeAfterAnswer(
    state: WorkflowStateType
) {
    return businessAnalyst.isInterviewComplete(
        state.project!
    )
        ? "generateBRD"
        : "askQuestion";
}