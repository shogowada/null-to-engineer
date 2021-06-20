import { JSONRPCServer } from "json-rpc-2.0";
import { addInstructionJSONRPCMethods } from "./instruction-json-rpc-methods";

export const addJSONRPCMethods = (jsonRPCServer: JSONRPCServer) => {
  addInstructionJSONRPCMethods(jsonRPCServer);
};
