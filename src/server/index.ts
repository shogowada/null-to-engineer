import { StatusCodes } from "http-status-codes";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as compression from "compression";
import { JSONRPCResponse } from "json-rpc-2.0";
import { RoutePath } from "../common";
import { configuration } from "./infrastructure";
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
console.log(`Starting server on ${Port}`);
app.listen(Port, () => {
  console.log(`Started server on ${Port}`);
});
