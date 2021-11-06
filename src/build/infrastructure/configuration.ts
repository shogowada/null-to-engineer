import * as path from "path";
import { RoutePath } from "../../common";

export interface Configuration {
  rootDir: string;
  publicDir: string;
  publicInstructionDir: string;
}

const rootDir: string = path.join(__dirname, "..", "..", "..");
const publicDir: string = path.join(rootDir, "public");

export const configuration: Configuration = {
  rootDir,
  publicDir,
  publicInstructionDir: path.join(publicDir, RoutePath.instructionJSONBase),
};

console.log(`Configuration: ${JSON.stringify(configuration, undefined, 2)}`);
