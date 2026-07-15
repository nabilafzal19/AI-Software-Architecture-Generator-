import { DatabaseDesignerAgent } from "../agents/database-designer/DatabaseDesignerAgent";
import { WorkflowStateType } from "../graph/workflow-state";

export async function DatabaseDesignNode(
    state: WorkflowStateType
) {
    const databaseDesigner =
        new DatabaseDesignerAgent();

    const databaseDesign =
        await databaseDesigner.designDatabase(
            state.architecture!
        );

    return {
        databaseDesign,
        workflowLogs: [
            "Database Design generated"
        ]
    };
}