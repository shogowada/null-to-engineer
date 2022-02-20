import { JSONRPCServer } from "json-rpc-2.0";
import {
  GetInstructionHTMLParams,
  Instruction,
  JSONRPCMethodName,
} from "../../common";
import { getInstruction } from "../business";

export const addInstructionJSONRPCMethods = (jsonRPCServer: JSONRPCServer) => {
  jsonRPCServer.addMethod(
    JSONRPCMethodName.GetInstructionHTML,
    async ({ id }: GetInstructionHTMLParams): Promise<string> => {
      const instruction: Instruction = await getInstruction(id);
      return instruction.html;
    }
  );
};
