import {
    ChromaClient,
    Collection,
} from "chromadb";

import { EmbeddingService } from "../llm/embedding/EmbeddingService";
import { MemoryService } from "./interfaces/MemoryService";
import { ProjectMemory } from "./schemas/project-memory.schema";

export class ChromaMemoryService
    implements MemoryService {

    private readonly client: ChromaClient;

    private readonly collections =
        new Map<string, Collection>();

    constructor(
        private readonly embeddingService =
            new EmbeddingService()
    ) {

     this.client = new ChromaClient({
    host: process.env.CHROMA_HOST!,
    port: Number(process.env.CHROMA_PORT),
    ssl: false,
});

    }

    private async getCollection(
        name: string
    ): Promise<Collection> {

        if (
            this.collections.has(name)
        ) {

            return this.collections.get(
                name
            )!;

        }

        const collection =
            await this.client
                .getOrCreateCollection({
                    name,
                     embeddingFunction: null,
                });

        this.collections.set(
            name,
            collection
        );

        return collection;

    }

    async storeProject(
        collectionName: string,
        project: ProjectMemory
    ): Promise<void> {

        const collection =
            await this.getCollection(
                collectionName
            );

        const embedding =
            await this.embeddingService
                .generateEmbedding(
                    project.content
                );

        await collection.add({

            ids: [project.id],

            embeddings: [embedding],

            documents: [
                project.content
            ],

            metadatas: [{

                projectId:
                    project.projectId,

                idea:
                    project.idea,

                domain:
                    project.domain,

                subcategory:
                    project.subcategory,

                createdAt:
                    project.createdAt,

            }],

        });

    }

    async searchProjects(
        collectionName: string,
        query: string,
        limit = 3
    ): Promise<ProjectMemory[]> {

        const collection =
            await this.getCollection(
                collectionName
            );

        const embedding =
            await this.embeddingService
                .generateEmbedding(
                    query
                );

        const result =
            await collection.query({

                queryEmbeddings: [
                    embedding
                ],

                nResults: limit,

                include: [
                    "documents",
                    "metadatas",
                ],

            });

        const ids =
            result.ids[0] ?? [];

        const documents =
            result.documents?.[0] ?? [];

        const metadatas =
            result.metadatas?.[0] ?? [];

        return ids.map(
            (id, index) => ({

                id,

                projectId:
                    metadatas[index]
                        ?.projectId as string,

                idea:
                    metadatas[index]
                        ?.idea as string,

                content:
                    documents[index] ?? "",

                domain:
                    metadatas[index]
                        ?.domain as string,

                subcategory:
                    metadatas[index]
                        ?.subcategory as string,

                createdAt:
                    metadatas[index]
                        ?.createdAt as string,

            })
        );

    }

}