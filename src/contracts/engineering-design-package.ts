import { BusinessRequirementsDocument } from "../agents/business-analyst/schemas/brd.schema";

import { SystemArchitecture } from "../agents/architect/schema/architecture.schema";

import { DatabaseDesign } from "../agents/database-designer/schemas/database-design.schema";

export interface EngineeringDesignPackage {

    brd: BusinessRequirementsDocument;

    architecture: SystemArchitecture;

    databaseDesign: DatabaseDesign;

}