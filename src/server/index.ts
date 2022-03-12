import { initializeTracer } from "./infrastructure";

initializeTracer();

import { configuration, trace } from "./infrastructure";
import { StatusCodes } from "http-status-codes";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as compression from "compression";
import { JSONRPCResponse } from "json-rpc-2.0";
import { RoutePath } from "../common";
import { handleRender } from "./render";
import { jsonRPCServer } from "./presentation";

const app = express();

app.use(bodyParser.json());
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use("/static", express.static(configuration.staticDir));
app.get(RoutePath.health, (req, res) => {
  res.sendStatus(200);
});
app.post(RoutePath.jsonRPC, async (req, res) => {
  const response: JSONRPCResponse | null = await jsonRPCServer.receive(
    req.body
  );
  if (response) {
    res.json(response).send();
  } else {
    res.sendStatus(StatusCodes.NO_CONTENT);
  }
});
app.use(handleRender);

const Port = 80;
trace("Start server", { port: Port }, () => {
  return new Promise<void>((resolve) => {
    app.listen(Port, () => {
      resolve();
    });
  });
});
