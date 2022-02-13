import * as path from "path";

export interface Configuration {
  rootDir: string;
  instructionDir: string;
  publicDir: string;
  staticDir: string;
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
};

console.log(`Configuration: ${JSON.stringify(configuration, undefined, 2)}`);
