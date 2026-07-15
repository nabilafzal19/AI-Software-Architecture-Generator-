import { StateGraph, START, END,MemorySaver } from "@langchain/langgraph";
import { WorkflowState } from "./workflow-state";
import { AnalyzeProjectNode } from "../nodes/analyze-project.node";
import { AskQuestionNode } from "../nodes/askQuestion.node";
import { SubmitAnswerNode } from "../nodes/submit.answer.node";
import { GenerateBRDNode } from "../nodes/generate-brd.node";
import { routeAfterAnswer } from "./routes";
import { ArchitectNode } from "../nodes/architect.node";
import { DatabaseDesignNode } from "../nodes/database.design.node";
import { FrontendNode } from "../nodes/frontend.node";
import { BackendNode } from "../nodes/backend.node";
import { QANode } from "../nodes/qa.node";
import { DevOpsNode } from "../nodes/devops.node";
import { routeAfterArchitectureReview } from "./review.routes";
import { ReviewArchitectureNode } from "../nodes/review-architecture.node";
import { HumanReviewNode } from "../nodes/human.review.node";

const checkpointer = new MemorySaver();
const graph = new StateGraph(WorkflowState)
    .addNode("analyzeProject", AnalyzeProjectNode)
    .addNode("askQuestion", AskQuestionNode)
    .addNode("submitAnswer", SubmitAnswerNode)
    .addNode("generateBRD", GenerateBRDNode)
    .addNode("architect",ArchitectNode)
    .addNode("reviewArchitecture",ReviewArchitectureNode)
    .addNode("humanReview",HumanReviewNode)
    .addNode("databaseDesigner",DatabaseDesignNode)
    .addNode("backend", BackendNode)
    .addNode("frontend", FrontendNode)
    .addNode("qa",QANode)
    .addNode("devops", DevOpsNode)
    .addEdge(START, "analyzeProject")
    .addEdge("analyzeProject", "askQuestion")
    .addEdge("askQuestion", "submitAnswer")
    .addConditionalEdges("submitAnswer",routeAfterAnswer)
    .addEdge("generateBRD", "architect")
    .addEdge( "architect","reviewArchitecture")
    .addConditionalEdges("reviewArchitecture",routeAfterArchitectureReview)
    .addEdge("humanReview",END)
    .addEdge("databaseDesigner", "backend")
    .addEdge("databaseDesigner", "frontend")
    .addEdge("backend", "qa")
    .addEdge("frontend", "qa")
    .addEdge("qa", "devops")
    .addEdge("devops", END)

    .compile({
     checkpointer,
  });

export default graph;