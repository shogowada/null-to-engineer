import * as path from "path";
import * as fs from "fs";
import {
  Instruction,
  InstructionID,
  InstructionIDs,
  InstructionMetadata,
  requireDefined,
} from "../../common";
import { configuration, traceSync } from "../infrastructure";
import { createInstruction } from "./instruction-factory";

const loadMarkdown = (instructionID: InstructionID): string => {
  return traceSync(
    "Read instruction file",
    { "instruction.id": instructionID },
    () =>
      fs.readFileSync(
        path.join(configuration.instructionDir, `${instructionID}.md`),
        { encoding: "utf-8" }
      )
  );
};

const createInstructionFromInstructionID = (
  instructionID: InstructionID
): Instruction => {
  return traceSync(
    "Create instruction",
    { "instruction.id": instructionID },
    () => {
      const markdown: string = loadMarkdown(instructionID);
      return createInstruction(instructionID, markdown);
    }
  );
};

const instructions: Instruction[] = traceSync("Create instructions", {}, () =>
  InstructionIDs.reduce(
    (instructions, instructionID: InstructionID): Instruction[] => [
      ...instructions,
      createInstructionFromInstructionID(instructionID),
    ],
    []
  )
);

const instructionIDToInstructionMap = new Map<InstructionID, Instruction>(
  instructions.map((instruction) => [instruction.id, instruction])
);

const instructionMetadataList: InstructionMetadata[] = instructions.map(
  (instruction): InstructionMetadata => ({
    id: instruction.id,
    name: instruction.name,
    sections: instruction.sections,
  })
);

export const getInstruction = (id: InstructionID): Instruction =>
  requireDefined(
    instructionIDToInstructionMap.get(id),
    `Instruction for ${id}`
  );

export const getInstructionMetadataList = (): InstructionMetadata[] =>
  instructionMetadataList;
