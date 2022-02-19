import { InstructionID } from "./instruction";

export enum JSONRPCMethodName {
  GetInstructionHTML = "GetInstructionHTML",
}

export interface GetInstructionHTMLParams {
  id: InstructionID;
}
