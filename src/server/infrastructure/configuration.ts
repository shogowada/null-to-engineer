import * as path from "path";

export interface Configuration {
  rootDir: string;
  publicDir: string;
}

const rootDir: string = path.join(__dirname, "..", "..", "..");

export const configuration: Configuration = {
  rootDir,
  publicDir: path.join(rootDir, "public"),
};

console.log(`Configuration: ${JSON.stringify(configuration, undefined, 2)}`);
