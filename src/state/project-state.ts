import { Requirement } from "../agents/business-analyst/schemas/requirement.schema";

export interface RequirementState {
  requirement: Requirement;
  answer: unknown;
  completed: boolean;
}

export interface ProjectState {
  id: string;
  idea: string;
  domain: string;
  subcategory: string;
  understanding: number;
  requirements: RequirementState[];
}