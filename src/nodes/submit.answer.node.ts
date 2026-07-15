import { BusinessAnalystAgent } from "../agents/business-analyst/BusinessAnalystAgent";
import { WorkflowStateType } from "../graph/workflow-state";

const businessAnalyst = new BusinessAnalystAgent();

export function SubmitAnswerNode(
    state: WorkflowStateType
) {
    businessAnalyst.submitAnswer(
        state.project!,
        state.lastAskedQuestion!,
        state.lastAnswer
    );

    return {
        project: state.project,
        lastAskedQuestion: null,
        lastAnswer: null,
           workflowLogs: [
        "Answer submitted",
    ],
    };
}