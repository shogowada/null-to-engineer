import * as path from "path";
import * as process from "process";

interface Configuration {
  targetURL: string;
  logDirPath: string;
}

export const configuration: Configuration = {
  targetURL: process.env.TARGET_URL!,
  logDirPath: path.join(__dirname, "..", "..", "..", "logs"),
};

console.log(`Configuration: ${JSON.stringify(configuration, undefined, 2)}`);
