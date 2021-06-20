import { JSONRPCServer } from "json-rpc-2.0";
import { GetInstructionHTMLParams, JSONRPCMethods } from "../../common";

export const addInstructionJSONRPCMethods = (jsonRPCServer: JSONRPCServer) => {
  jsonRPCServer.addMethod(
    JSONRPCMethods.GetInstructionHTML,
    ({ id }: GetInstructionHTMLParams): PromiseLike<string> => {
      return Promise.resolve("Hello, World! for " + id);
    }
  );
};
