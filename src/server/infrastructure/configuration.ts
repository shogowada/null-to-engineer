import * as path from "path";
import * as process from "process";

export interface Configuration {
  rootDir: string;
  instructionDir: string;
  publicDir: string;
  staticDir: string;
  serviceName: string;
  honeycombAPIKey: string | undefined;
  honeycombDataset: string;
}

const rootDir: string = path.join(__dirname, "..", "..", "..");
const instructionDir: string = path.join(rootDir, "instructions");
const publicDir: string = path.join(rootDir, "public");
const staticDir: string = path.join(publicDir, "static");

export const configuration: Configuration = {
  rootDir,
  instructionDir,
  publicDir,
  staticDir,
  serviceName: process.env.SERVICE_NAME ?? "null-to-engineer",
  honeycombAPIKey: process.env.HONEYCOMB_TEAM,
  honeycombDataset: process.env.HONEYCOMB_DATASET ?? "null-to-engineer",
};

console.log(`Configuration: ${JSON.stringify(configuration, undefined, 2)}`);
