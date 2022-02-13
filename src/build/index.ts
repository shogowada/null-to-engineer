import * as path from "path";
import * as fs from "fs";
import { Instruction, InstructionIDs, RoutePath } from "../common";
import { configuration } from "./infrastructure";
import { getInstruction, getInstructionMetadataList } from "../server/business";

const buildInstructions = (): void => {
  fs.mkdirSync(configuration.publicInstructionDir, { recursive: true });

  InstructionIDs.forEach((instructionID) => {
    const instruction: Instruction = getInstruction(instructionID);

    fs.writeFileSync(
      path.join(
        configuration.publicDir,
        RoutePath.instructionJSON(instruction.id)
      ),
      JSON.stringify(instruction)
    );
  });

  fs.writeFileSync(
    path.join(configuration.publicDir, RoutePath.instructionMetadataListJSON),
    JSON.stringify(getInstructionMetadataList())
  );
};

console.log("Building instructions...");
buildInstructions();
console.log("Built instructions");
