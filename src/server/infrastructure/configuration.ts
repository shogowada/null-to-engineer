import * as path from "path";

export interface Configuration {
  rootDir: string;
}

export const configuration: Configuration = {
  rootDir: path.join(__dirname, "..", "..", ".."),
};

console.log(`Configuration: ${JSON.stringify(configuration, undefined, 2)}`);
