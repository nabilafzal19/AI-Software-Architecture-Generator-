import { llm } from "../../llm/openai";
import { classifyDomainPrompt } from "./prompts/classify-domain.prompt";
import { DomainSchema } from "./schemas/domain.schema";
import {
  RequirementBlueprintSchema,
} from "./schemas/requirement.schema";

import {
  requirementBlueprintPrompt,
} from "./prompts/requirement.blueprint.prompt";

import { v4 as uuid } from "uuid";
import { ProjectState, RequirementState } from "../../state/project-state";

import {
  BusinessRequirementsDocument,
  BusinessRequirementsDocumentSchema,
} from "./schemas/brd.schema";

import { generateBRDPrompt } from "./prompts/brd.prompt";


export class BusinessAnalystAgent {
  private structuredModel = llm.withStructuredOutput(DomainSchema);

  private classifyDomainChain =
    classifyDomainPrompt.pipe(this.structuredModel);

 private async classifyDomain(idea: string) {
    return this.classifyDomainChain.invoke({
      idea,
    });
  }

 private async generateRequirementBlueprint(
  domain: string,
  subcategory: string
) {
  const structuredModel =
    llm.withStructuredOutput(
      RequirementBlueprintSchema
    );

  const chain =
    requirementBlueprintPrompt.pipe(structuredModel);

  return chain.invoke({
    domain,
    subcategory,
  });
}



public async analyzeProject(
    idea: string
): Promise<ProjectState> {

    const domain =
        await this.classifyDomain(idea);

    const blueprint =
        await this.generateRequirementBlueprint(
            domain.domain,
            domain.subcategory
        );

    return {
        id: uuid(),
        idea,
        domain: domain.domain,
        subcategory: domain.subcategory,
        understanding: 0,
        requirements:
            blueprint.requirements.map(
                requirement => ({
                    requirement,
                    answer: null,
                    completed: false
                })
            )
    }
}

public getNextQuestion(
    state: ProjectState
): RequirementState | null {

    return (
        state.requirements.find(
            requirement => !requirement.completed
        ) ?? null
    );

}

public submitAnswer(
    state: ProjectState,
    requirement: RequirementState,
    answer: unknown
): ProjectState {

    requirement.answer = answer;
    requirement.completed = true;

    this.updateUnderstanding(state);

    return state;
}

private updateUnderstanding(
    state: ProjectState
): void {

    const completed =
        state.requirements.filter(
            requirement => requirement.completed
        ).length;

    state.understanding =
        completed / state.requirements.length;
}


private prepareBRDContext(state: ProjectState) {
  return {
    idea: state.idea,

    domain: state.domain,

    subcategory: state.subcategory,

    requirements: state.requirements.map((requirement) => ({
      title: requirement.requirement.title,
      answer: requirement.answer,
    })),
  };
}

private canGenerateBRD(
  state: ProjectState
): boolean {
  return state.requirements.every(
    requirement => requirement.completed
  );
}
public async generateBRD(
    state: ProjectState,
    previousBrds: string = ""
): Promise<BusinessRequirementsDocument> {

    if (!this.canGenerateBRD(state)) {
        throw new Error(
            "Interview is incomplete. Please answer all questions before generating the BRD."
        );
    }

    const structuredModel =
        llm.withStructuredOutput(
            BusinessRequirementsDocumentSchema
        );

    const chain =
        generateBRDPrompt.pipe(
            structuredModel
        );

    const context = {

        ...this.prepareBRDContext(state),

        // NEW: Previous similar BRDs retrieved from memory
        previousBrds,

    };

    const brd =
        await chain.invoke(context);

    return brd;
}

public isInterviewComplete(
    state: ProjectState
): boolean {
    return this.canGenerateBRD(state);
}

}