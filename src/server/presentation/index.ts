import { JSONRPCServer } from "json-rpc-2.0";
import { addAppJSONRPCMethods } from "./app-json-rpc-methods";
import { addInstructionJSONRPCMethods } from "./instruction-json-rpc-methods";

export const addJSONRPCMethods = (jsonRPCServer: JSONRPCServer) => {
  addAppJSONRPCMethods(jsonRPCServer);
  addInstructionJSONRPCMethods(jsonRPCServer);
};
