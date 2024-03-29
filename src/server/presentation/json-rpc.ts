import { JSONRPCServer, TypedJSONRPCServer } from "json-rpc-2.0";
import { JSONRPCMethods } from "../../common";
import { trace } from "../infrastructure";
import { addInstructionJSONRPCMethods } from "./instruction-json-rpc-methods";

export const jsonRPCServer: TypedJSONRPCServer<JSONRPCMethods> =
  new JSONRPCServer();

jsonRPCServer.applyMiddleware((next, request) => {
  return trace(`JSON-RPC method (${request.method})`, {}, () => {
    return next(request);
  });
});

addInstructionJSONRPCMethods(jsonRPCServer);
