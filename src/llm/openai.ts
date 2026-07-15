import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import "dotenv/config";

export const llm = new ChatOpenAI({
  model: "gpt-4.1-mini",
  temperature: 0,
});

export const embeddingModel =
  new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});