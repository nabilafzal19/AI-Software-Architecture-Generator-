import { llm } from "../../../llm/openai";
import { classifyDomainPrompt } from "../prompts/classify-domain.prompt";
import { DomainSchema } from "../schemas/domain.schema";

const structuredModel = llm.withStructuredOutput(DomainSchema);

const chain = classifyDomainPrompt.pipe(structuredModel);

export async function classifyDomain(idea: string) {
  return chain.invoke({
    idea,
  });
}