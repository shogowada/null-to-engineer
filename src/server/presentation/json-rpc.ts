import { JSONRPCServer } from "json-rpc-2.0";
import { addInstructionJSONRPCMethods } from "./instruction-json-rpc-methods";

export const jsonRPCServer = new JSONRPCServer();

addInstructionJSONRPCMethods(jsonRPCServer);
