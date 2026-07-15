import { llm } from "../../llm/openai";
import { BusinessRequirementsDocument } from "../business-analyst/schemas/brd.schema";
import { ReviewSchema } from "../../shared/review.schema";
import { reviewArchitecturePrompt } from "./prompt/review-architecture.prompt";
import { SystemArchitecture } from "./schema/architecture.schema";

export class ArchitectReviewerAgent {

    async reviewArchitecture(input: {
        brd: BusinessRequirementsDocument;
        architecture: SystemArchitecture;
    }) {

        const structuredModel =
            llm.withStructuredOutput(
                ReviewSchema
            );

        const chain =
            reviewArchitecturePrompt.pipe(
                structuredModel
            );

        return chain.invoke(input);
    }
}