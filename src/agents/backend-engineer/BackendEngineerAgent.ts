import { llm } from "../../llm/openai";

import {
  BusinessRequirementsDocument,
} from "../business-analyst/schemas/brd.schema";

import {
  SystemArchitecture,
} from "../architect/schema/architecture.schema";

import {
  DatabaseDesign,
} from "../database-designer/schemas/database-design.schema";

import {
  BackendImplementationPlan,
  BackendImplementationPlanSchema,
} from "./schemas/backend-implementation.schema";

import { generateBackendPlanPrompt } from "./prompts/generate-backend-plan.prompt";
import { EngineeringDesignPackage }
from "../../contracts/engineering-design-package";

// export interface EngineeringDesignPackage {
//   brd: BusinessRequirementsDocument;
//   architecture: SystemArchitecture;
//   databaseDesign: DatabaseDesign;
// }

export class BackendEngineerAgent {

  private prepareContext(
    designPackage: EngineeringDesignPackage
  ) {
    return {
      designPackage: JSON.stringify(
        designPackage,
        null,
        2
      ),
    };
  }

  public async generateImplementationPlan(
    designPackage: EngineeringDesignPackage
  ): Promise<BackendImplementationPlan> {

    const structuredModel =
      llm.withStructuredOutput(
        BackendImplementationPlanSchema
      );

    const chain =
      generateBackendPlanPrompt.pipe(
        structuredModel
      );

    const context =
      this.prepareContext(designPackage);

    return chain.invoke(context);
  }
}