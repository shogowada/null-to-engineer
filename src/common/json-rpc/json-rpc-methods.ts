import { InstructionID } from "../instruction";

export enum JSONRPCMethods {
  GetInstructionHTML = "getInstructionHTML",
}

export interface GetInstructionHTMLParams {
  id: InstructionID;
}
