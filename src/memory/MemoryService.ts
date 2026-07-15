import { ProjectMemory } from "./schemas/project-memory.schema";

export interface MemoryService {

    storeProject(
        collection: string,
        project: ProjectMemory
    ): Promise<void>;

    searchProjects(
        collection: string,
        query: string,
        limit?: number
    ): Promise<ProjectMemory[]>;

}