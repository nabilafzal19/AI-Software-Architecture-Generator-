import { ChromaMemoryService } from "./src/memory/chroma-memory.service";

async function main() {
    const memory = new ChromaMemoryService();

    console.log("Storing...");

    // await memory.storeProject("test", {
    //     id: "1",
    //     projectId: "1",
    //     idea: "Hospital",
    //     content: "Hospital Management System",
    //     domain: "Healthcare",
    //     subcategory: "Hospital",
    //     createdAt: new Date().toISOString(),
    // });

    // console.log("Stored");

    const results = await memory.searchProjects("architect-memory", "Hospital");

    console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);