import { llm } from "../../llm/openai";

import { EngineeringDesignPackage } from "../../contracts/engineering-design-package";

import { BackendImplementationPlan } from "../backend-engineer/schemas/backend-implementation.schema";

import { FrontendPlan } from "../frontend-planner/schemas/frontend-plan.schema";

import { QAReview } from "../qa-engineer/schemas/qa-review.schema";

import {
  DevOpsPlan,
  DevOpsPlanSchema,
} from "./schemas/devops-plan.schema";

import { generateDevOpsPlanPrompt } from "./prompts/generate-devops-plan.prompt";

export interface DevOpsInput {
  designPackage: EngineeringDesignPackage;
  backendPlan: BackendImplementationPlan;
  frontendPlan: FrontendPlan;
  qaReview: QAReview;
}

export class DevOpsPlannerAgent {

  private prepareContext(
    input: DevOpsInput
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

      qaReview: JSON.stringify(
        input.qaReview,
        null,
        2
      ),
    };
  }

  public async generateDevOpsPlan(
    input: DevOpsInput
  ): Promise<DevOpsPlan> {

    const structuredModel =
      llm.withStructuredOutput(
        DevOpsPlanSchema
      );

    const chain =
      generateDevOpsPlanPrompt.pipe(
        structuredModel
      );

    const context =
      this.prepareContext(input);

    return chain.invoke(context);
  }
}