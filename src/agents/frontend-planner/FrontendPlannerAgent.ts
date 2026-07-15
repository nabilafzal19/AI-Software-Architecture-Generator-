import { llm } from "../../llm/openai";

import { EngineeringDesignPackage } from "../../contracts/engineering-design-package";

import {
  FrontendPlan,
  FrontendPlanSchema,
} from "./schemas/frontend-plan.schema";

import { generateFrontendPlanPrompt } from "./prompts/generate-frontend-plan.prompt";

export class FrontendPlannerAgent {

  private prepareContext(
    designPackage: EngineeringDesignPackage
  ) {
    return {
      designPackage: JSON.stringify(
        designPackage,
        null,
        2,
      ),
    };
  }

  public async generateFrontendPlan(
    designPackage: EngineeringDesignPackage
  ): Promise<FrontendPlan> {

    const structuredModel =
      llm.withStructuredOutput(
        FrontendPlanSchema
      );

    const chain =
      generateFrontendPlanPrompt.pipe(
        structuredModel
      );

    const context =
      this.prepareContext(
        designPackage
      );

    return chain.invoke(context);
  }
}