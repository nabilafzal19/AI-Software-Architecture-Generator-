import { ChatPromptTemplate } from "@langchain/core/prompts";

export const requirementBlueprintPrompt =
  ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are an experienced Business Analyst.

Generate a comprehensive requirement blueprint for the given software domain.

Rules:
- Generate only important business requirements.
- Do not ask implementation questions.
- Return 1 to 5 requirements.
- Every requirement must have:
  - id
  - title
  - question
  - type
  - required
- Use snake_case for ids.
- Questions should be clear and concise.`,
    ],

    [
      "human",
      `
Domain: {domain}

Subcategory: {subcategory}
`,
    ],
  ]);