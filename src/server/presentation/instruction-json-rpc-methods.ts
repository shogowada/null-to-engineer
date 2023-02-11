import { TypedJSONRPCServer } from "json-rpc-2.0";
import {
  GetInstructionHTMLParams,
  Instruction,
  JSONRPCMethods,
} from "../../common";
import { getInstruction } from "../business";

export const addInstructionJSONRPCMethods = (
  jsonRPCServer: TypedJSONRPCServer<JSONRPCMethods>
) => {
  jsonRPCServer.addMethod(
    "getInstructionHTML",
    async ({ id }: GetInstructionHTMLParams): Promise<string> => {
      const instruction: Instruction = await getInstruction(id);
      return instruction.html;
    }
  );
};
