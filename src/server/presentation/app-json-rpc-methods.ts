import { JSONRPCServer } from "json-rpc-2.0";
import { JSONRPCMethodNames } from "../../common";

const packageJSON: any = require("../../../package.json");

export const addAppJSONRPCMethods = (jsonRPCServer: JSONRPCServer) => {
  jsonRPCServer.addMethod(
    JSONRPCMethodNames.GetVersion,
    () => packageJSON.version
  );
};
