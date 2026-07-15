import { llm } from "../../llm/openai";

import { generateArchitecturePrompt } from "./prompt/generate-architecture.prompt";

import {
  BusinessRequirementsDocument,
} from "../business-analyst/schemas/brd.schema";

import {
  SystemArchitecture,
  SystemArchitectureSchema,
} from "./schema/architecture.schema";
import { Review } from "../../shared/review.schema";
import { DesignArchitectureInput } from "./schema/design-architecture.input";


export class ArchitectAgent {
private prepareArchitectureContext(
  input: DesignArchitectureInput
) {
  return {
brd: JSON.stringify(input.brd, null, 2),

    previousArchitecture:
        input.previousArchitecture
            ? JSON.stringify(input.previousArchitecture, null, 2)
            : "No previous architecture.",

    review:
        input.review
            ? JSON.stringify(input.review, null, 2)
            : "No review available.",
  };
}

public async designSystem(
   input: DesignArchitectureInput
): Promise<SystemArchitecture> {

  const structuredModel =
    llm.withStructuredOutput(
      SystemArchitectureSchema
    );

  const chain =
    generateArchitecturePrompt.pipe(
      structuredModel
    );

  const context =
    this.prepareArchitectureContext(input);

return chain.invoke({

    ...context,

    previousArchitectures:
        input.previousArchitectures ?? "",

});
}
}