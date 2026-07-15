import { llm } from "../../llm/openai";

import { EngineeringDesignPackage } from "../../contracts/engineering-design-package";

import { BackendImplementationPlan } from "../backend-engineer/schemas/backend-implementation.schema";

import { FrontendPlan } from "../frontend-planner/schemas/frontend-plan.schema";

import {
  QAReview,
  QAReviewSchema,
} from "./schemas/qa-review.schema";

import { reviewEngineeringPackagePrompt } from "./prompts/review-engineering-package.prompt";

export interface QAReviewInput {
  designPackage: EngineeringDesignPackage;
  backendPlan: BackendImplementationPlan;
  frontendPlan: FrontendPlan;
}

export class QAEngineerAgent {
private prepareContext(
  input: QAReviewInput
) {
  return {
    designPackage: JSON.stringify(
      input.designPackage,
      null,
      2
    ),

    backendPlan: JSON.stringify(
      input.backendPlan,
      null,
      2
    ),

    frontendPlan: JSON.stringify(
      input.frontendPlan,
      null,
      2
    ),
  };
}

public async reviewEngineeringPackage(
  input: QAReviewInput
): Promise<QAReview> {

  const structuredModel =
    llm.withStructuredOutput(
      QAReviewSchema
    );

  const chain =
    reviewEngineeringPackagePrompt.pipe(
      structuredModel
    );

  const context =
    this.prepareContext(input);

  return chain.invoke(context);
}
}