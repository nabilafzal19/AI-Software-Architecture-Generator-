import { BusinessAnalystAgent } from "../agents/business-analyst/BusinessAnalystAgent";
import { WorkflowStateType } from "../graph/workflow-state";



export async function AnalyzeProjectNode(
     state: WorkflowStateType
) {
    const businessAnalyst = new BusinessAnalystAgent();
    const project =
        await businessAnalyst.analyzeProject(
            state.idea
        );

    return {
        project,
    };
}