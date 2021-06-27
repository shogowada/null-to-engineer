import { JSONRPCServer } from "json-rpc-2.0";
import { GetInstructionHTMLParams, JSONRPCMethodNames } from "../../common";
import { createInstructionHTML } from "../business";

export const addInstructionJSONRPCMethods = (jsonRPCServer: JSONRPCServer) => {
  jsonRPCServer.addMethod(
    JSONRPCMethodNames.GetInstructionHTML,
    ({ id }: GetInstructionHTMLParams) => createInstructionHTML(id)
  );
};
