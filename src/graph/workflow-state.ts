import { Annotation } from "@langchain/langgraph";
import { ProjectState, RequirementState } from "../state/project-state";
import { BusinessRequirementsDocument } from "../agents/business-analyst/schemas/brd.schema";
import { SystemArchitecture } from "../agents/architect/schema/architecture.schema";
import { DatabaseDesign } from "../agents/database-designer/schemas/database-design.schema";
import { FrontendPlan } from "../agents/frontend-planner/schemas/frontend-plan.schema";
import { BackendImplementationPlan } from "../agents/backend-engineer/schemas/backend-implementation.schema";
import { QAReview } from "../agents/qa-engineer/schemas/qa-review.schema";
import { DevOpsPlan } from "../agents/devops-planner/schemas/devops-plan.schema";
import { Review } from "../shared/review.schema";

export const WorkflowState = Annotation.Root({
    idea: Annotation<string>(),

    project: Annotation<ProjectState>(),

    lastAskedQuestion: Annotation<RequirementState | null>(),

    lastAnswer: Annotation<unknown>(),

    brd: Annotation<BusinessRequirementsDocument>(),

    architecture: Annotation<SystemArchitecture>(),
    databaseDesign: Annotation<DatabaseDesign>(),
    backendPlan: Annotation<BackendImplementationPlan>(),
    frontendPlan: Annotation<FrontendPlan>(),
    qaReview: Annotation<QAReview>(),
    devopsPlan: Annotation<DevOpsPlan>(),

    architectureReview: Annotation<Review>(),

    architectureRetryCount: Annotation<number>({
    reducer: (_, update) => update,
    default: () => 0,
    }),

     workflowLogs: Annotation<string[]>({
        reducer: (state, update) => {
            return [...state, ...update];
        },
        default: () => [],
    }),
});

export type WorkflowStateType = typeof WorkflowState.State;