import * as path from "path";
import * as process from "process";

interface Configuration {
  targetURL: string;
  logDirPath: string;
  defaultTimeout: number;
}

export const configuration: Configuration = {
  targetURL: process.env.TARGET_URL!,
  logDirPath: path.join(__dirname, "..", "..", "..", "logs"),
  defaultTimeout: 30 * 1000,
};

console.log(`Configuration: ${JSON.stringify(configuration, undefined, 2)}`);
