// import { BusinessAnalystAgent } from "./agents/business-analyst/BusinessAnalystAgent";
// import { askUser, closeTerminal } from "./utils/terminal";
// import { ArchitectAgent } from "./agents/architect/ArchitectAgent";

// import { DatabaseDesignerAgent } from "./agents/database-designer/DatabaseDesignerAgent";
// import { BackendEngineerAgent } from "./agents/backend-engineer/BackendEngineerAgent";
// import { FrontendPlannerAgent } from "./agents/frontend-planner/FrontendPlannerAgent";

// import { QAEngineerAgent } from "./agents/qa-engineer/QAEngineerAgent";
// import { DevOpsPlannerAgent } from "./agents/devops-planner/DevOpsPlannerAgent";
// import graph from "./graph/workflow";

// async function main() {
//   await graph.invoke({
//     idea: "I want to build Hospital Management Software",
// });

//     const businessAnalyst =
//         new BusinessAnalystAgent();

//     const state =
//         await businessAnalyst.analyzeProject(
//             "I want to build Hospital Management Software"
//         );

//     while (true) {

//         const question =
//             businessAnalyst.getNextQuestion(state);

//         if (!question) {
//             break;
//         }

//         console.log(
//             "\nAI:",
//             question.requirement.question
//         );

//         const answer =
//             await askUser("You: ");

//         businessAnalyst.submitAnswer(
//             state,
//             question,
//             answer
//         );

//         console.log(
//             `Understanding: ${(
//                 state.understanding * 100
//             ).toFixed(0)}%`
//         );
//     }
//   closeTerminal();
//     console.log("\nInterview Completed!");
//     // console.log(
//     //     JSON.stringify(state, null, 2)
//     // );

//     const brd =
//   await businessAnalyst.generateBRD(state);

// const architect =
//   new ArchitectAgent();

// const architecture =
//   await architect.designSystem(brd);



// const databaseDesigner =
//   new DatabaseDesignerAgent();

// const databaseDesign =
//   await databaseDesigner.designDatabase(
//     architecture
//   );

// const backendEngineer =
//   new BackendEngineerAgent();

// const backendPlan =
//   await backendEngineer.generateImplementationPlan({
//     brd,
//     architecture,
//     databaseDesign,
//   });

// const frontendPlanner =
//   new FrontendPlannerAgent();

// const frontendPlan =
//   await frontendPlanner.generateFrontendPlan({
//     brd,
//     architecture,
//     databaseDesign,
//   });

// const qaEngineer = new QAEngineerAgent();

// const qaReview =
//   await qaEngineer.reviewEngineeringPackage({
//     designPackage: {
//       brd,
//       architecture,
//       databaseDesign,
//     },
//     backendPlan,
//     frontendPlan,
//   });

// const devopsPlanner =
//   new DevOpsPlannerAgent();

// const devopsPlan =
//   await devopsPlanner.generateDevOpsPlan({
//     designPackage: {
//       brd,
//       architecture,
//       databaseDesign,
//     },
//     backendPlan,
//     frontendPlan,
//     qaReview,
//   });

// console.log(
//   JSON.stringify(
//     devopsPlan,
//     null,
//     2
//   )
// );

  
// }

// main();

import { Command } from "@langchain/langgraph";
import graph from "./graph/workflow";
import { askUser, closeTerminal } from "./utils/terminal";

async function main() {

    const config = {
        configurable: {
            thread_id: "hospital-1",
        },
    };

    let result:any = await graph.invoke(
        {
            idea: "Hospital Management System",
        },
        config
    );

    while (result.__interrupt__?.length) {

        const interrupt = result.__interrupt__[0];

        console.log(
            "\nAI:",
            interrupt.value.payload.requirement.question
        );

        const answer = await askUser("You: ");

        result = await graph.invoke(
            new Command({
                resume: answer,
            }),
            config
        );
    }

    closeTerminal();

    console.log("\nInterview Completed!");

    console.log(result.workflowLogs);

    console.log(result.databaseDesign);
}

main();