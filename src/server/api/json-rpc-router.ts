import { Router } from "express";
import * as bodyParser from "body-parser";
import { NO_CONTENT } from "http-status-codes";
import {
  createJSONRPCErrorResponse,
  JSONRPCRequest,
  JSONRPCResponse,
  JSONRPCServer,
} from "json-rpc-2.0";
import { addJSONRPCMethods } from "../presentation";

const jsonRPCServer = new JSONRPCServer();
addJSONRPCMethods(jsonRPCServer);

export const jsonRPCRouter = Router();
jsonRPCRouter.use(bodyParser.json());
jsonRPCRouter.route("/").post(async (req, res) => {
  const request: JSONRPCRequest = req.body;

  const respond = (response: JSONRPCResponse | null): void => {
    if (response) {
      res.json(response);
    } else {
      res.sendStatus(NO_CONTENT);
    }
  };

  const respondError = (error: any): void => {
    if (request.id !== undefined && request.id !== null) {
      const response: JSONRPCResponse = createJSONRPCErrorResponse(
        request.id!,
        0,
        error?.message || "An unexpected error occurred"
      );
      res.json(response);
    } else {
      res.sendStatus(NO_CONTENT);
    }
  };

  jsonRPCServer.receive(request).then(respond, respondError);
});
