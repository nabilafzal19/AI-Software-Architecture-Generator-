import { ChatPromptTemplate } from "@langchain/core/prompts";

export const classifyDomainPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are an experienced Business Analyst.

Your responsibility is to identify the business domain of a software project.

Always classify the user's idea into:
- domain
- subcategory
- confidence
- reasoning

Do not invent information.
Base your decision only on the user's description.`,
  ],

  [
    "human",
    "{idea}",
  ],
]);