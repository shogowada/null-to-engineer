import * as path from "path";
import * as express from "express";
import * as helmet from "helmet";
import * as compression from "compression";
import { configuration } from "./infrastructure";
import { handleRender, jsonRPCRouter } from "./api";

const app = express();

app.use(/^(?!\/webapi\/)/, compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use("/webapi/json-rpc", jsonRPCRouter);

const packageJSON: any = require(path.join(
  __dirname,
  "..",
  "..",
  "package.json"
));
app.get("/webapi", (req, res) => {
  res.send({
    name: packageJSON.name,
    version: packageJSON.version,
  });
});

app.use(express.static(configuration.publicDir));
app.get("/*", handleRender);

const Port = 80;
console.log(`Starting server on ${Port}`);
app.listen(Port, () => {
  console.log(`Started server on ${Port}`);
});
