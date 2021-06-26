import { InstructionID } from "./instruction";

export enum JSONRPCMethodNames {
  GetInstructionHTML = "GetInstructionHTML",
  GetVersion = "GetVersion",
}

export interface GetInstructionHTMLParams {
  id: InstructionID;
}
