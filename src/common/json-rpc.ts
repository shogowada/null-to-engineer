import { InstructionID } from "./instruction";

export enum JSONRPCMethodNames {
  GetInstructionHTML = "GetInstructionHTML",
  GetInstructionMetadataList = "GetInstructionMetadataList",
  GetVersion = "GetVersion",
}

export interface GetInstructionHTMLParams {
  id: InstructionID;
}
