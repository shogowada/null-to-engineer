import { JSONRPCServer } from "json-rpc-2.0";
import { GetInstructionHTMLParams, JSONRPCMethodNames } from "../../common";

export const addInstructionJSONRPCMethods = (jsonRPCServer: JSONRPCServer) => {
  jsonRPCServer.addMethod(
    JSONRPCMethodNames.GetInstructionHTML,
    ({ id }: GetInstructionHTMLParams) => "Hello, World!"
  );
};
