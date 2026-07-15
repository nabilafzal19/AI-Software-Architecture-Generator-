// src/embedding/EmbeddingService.ts

import { embeddingModel } from "../openai";

export class EmbeddingService {

    async generateEmbedding(
        text: string
    ): Promise<number[]> {

        return embeddingModel.embedQuery(text);

    }

}