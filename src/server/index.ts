import * as path from "path";
import * as express from "express";
import * as helmet from "helmet";
import * as compression from "compression";
import { jsonRPCRouter } from "./api";

const app = express();

app.use(/^(?!\/webapi\/)/, compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(`/webapi/json-rpc`, jsonRPCRouter);

const publicDir = path.join(__dirname, "..", "..", "public");
app.use(express.static(publicDir));
app.get("/*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

const Port = 80;
console.log(`Starting server on ${Port}`);
app.listen(Port, () => {
  console.log(`Started server on ${Port}`);
});
