import * as path from "path";
import * as fs from "fs";
import {
  Dictionary,
  Instruction,
  InstructionID,
  InstructionIDs,
  InstructionMetadata,
} from "../../common";
import { configuration } from "../infrastructure";
import { createInstruction } from "./instruction-factory";

const loadMarkdown = (instructionID: InstructionID): string => {
  return fs.readFileSync(
    path.join(configuration.rootDir, "instructions", `${instructionID}.md`),
    { encoding: "utf-8" }
  );
};

const createInstructionFromInstructionID = (
  instructionID: InstructionID
): Instruction => {
  const markdown: string = loadMarkdown(instructionID);
  return createInstruction(instructionID, markdown);
};

const instructions: Instruction[] = InstructionIDs.reduce(
  (instructions, instructionID: InstructionID): Instruction[] => [
    ...instructions,
    createInstructionFromInstructionID(instructionID),
  ],
  []
);

const instructionIDToInstructionDictionary: Dictionary<Instruction> =
  instructions.reduce(
    (dictionary, instruction: Instruction): Dictionary<Instruction> => ({
      ...dictionary,
      [instruction.id]: instruction,
    }),
    {}
  );

const instructionMetadataList: InstructionMetadata[] = instructions.map(
  (instruction): InstructionMetadata => ({
    id: instruction.id,
    name: instruction.name,
    sections: instruction.sections,
  })
);

export const getInstruction = (id: InstructionID): Instruction =>
  instructionIDToInstructionDictionary[id];

export const getInstructionMetadataList = (): InstructionMetadata[] =>
  instructionMetadataList;
