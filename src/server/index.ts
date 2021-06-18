import * as path from "path";
import * as express from "express";
import * as helmet from "helmet";
import * as compression from "compression";

const app = express();

app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

const publicDir = path.join(__dirname, "..", "..", "public");
app.use(express.static(publicDir));
app.get("/*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

const Port = 80;
app.listen(Port, () => {
  console.log(`Listening on ${Port}`);
});
