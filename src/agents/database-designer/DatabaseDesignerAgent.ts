import { llm } from "../../llm/openai";

import {
  SystemArchitecture,
} from "../architect/schema/architecture.schema";

import {
  DatabaseDesign,
  DatabaseDesignSchema,
} from "./schemas/database-design.schema";

import { generateDatabaseDesignPrompt } from "./prompts/generate-database-design.prompt";




export class DatabaseDesignerAgent {

    private prepareDatabaseContext(
  architecture: SystemArchitecture
) {
  return {
    architecture: JSON.stringify(
      architecture,
      null,
      2
    ),
  };
}

public async designDatabase(
  architecture: SystemArchitecture
): Promise<DatabaseDesign> {

  const structuredModel =
    llm.withStructuredOutput(
      DatabaseDesignSchema
    );

  const chain =
    generateDatabaseDesignPrompt.pipe(
      structuredModel
    );

  const context =
    this.prepareDatabaseContext(
      architecture
    );

  return chain.invoke(context);
}
}