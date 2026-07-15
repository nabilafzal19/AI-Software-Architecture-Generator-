import { interrupt } from "@langchain/langgraph";
import { BusinessAnalystAgent } from "../agents/business-analyst/BusinessAnalystAgent";
import { WorkflowStateType } from "../graph/workflow-state";

const businessAnalyst = new BusinessAnalystAgent();

export function AskQuestionNode(
    state: WorkflowStateType
) {
    const question =
        businessAnalyst.getNextQuestion(
            state.project!
        );

 const answer = interrupt({
    type: "interview_question",
    payload: question,
});

    return {
        lastAskedQuestion: question,
        lastAnswer: answer,
           workflowLogs: [
        `Asked: ${question?.requirement?.title}`,
    ]
    };
}