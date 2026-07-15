import { BusinessRequirementsDocument } from "../../business-analyst/schemas/brd.schema";
import { SystemArchitecture } from "./architecture.schema";
import { Review } from "../../../shared/review.schema";

export interface DesignArchitectureInput {
    brd: BusinessRequirementsDocument;

    previousArchitecture?: SystemArchitecture;
    
     // Memory (retrieved from Chroma)
     previousArchitectures?: string;

    review?: Review;
}