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

const rootDir: string = path.join(__dirname, "..", "..");
const publicDir: string = path.join(rootDir, "public");

app.use(express.static(publicDir));
app.get("/*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

const Port = 80;
console.log(`Starting server on ${Port}`);
app.listen(Port, () => {
  console.log(`Started server on ${Port}`);
});
