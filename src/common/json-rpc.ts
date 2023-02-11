import { InstructionID } from "./instruction";

export interface GetInstructionHTMLParams {
  id: InstructionID;
}

export type JSONRPCMethods = {
  getInstructionHTML(params: GetInstructionHTMLParams): string;
};
