import { BusinessAnalystAgent } from "../agents/business-analyst/BusinessAnalystAgent";
import { WorkflowStateType } from "../graph/workflow-state";

const businessAnalyst = new BusinessAnalystAgent();

export async function GetNextQuestionNode(
    state: WorkflowStateType
) {
    const currentQuestion =
        businessAnalyst.getNextQuestion(
            state.project!
        );

    return {
        currentQuestion,
    };
}