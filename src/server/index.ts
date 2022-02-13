import * as express from "express";
import * as helmet from "helmet";
import * as compression from "compression";
import { configuration } from "./infrastructure";
import { handleRender } from "./render";

const app = express();

app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use("/static", express.static(configuration.staticDir));
app.use(handleRender);

const Port = 80;
console.log(`Starting server on ${Port}`);
app.listen(Port, () => {
  console.log(`Started server on ${Port}`);
});
