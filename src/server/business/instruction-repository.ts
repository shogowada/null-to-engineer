import * as path from "path";
import * as fs from "fs";
import {
  Instruction,
  InstructionID,
  InstructionIDs,
  InstructionMetadata,
  requireDefined,
} from "../../common";
import { configuration, trace } from "../infrastructure";
import { createInstruction } from "./instruction-factory";

const loadMarkdown = (instructionID: InstructionID): PromiseLike<string> => {
  return trace(
    "Read instruction file",
    { "instruction.id": instructionID },
    () =>
      fs.promises.readFile(
        path.join(configuration.instructionDir, `${instructionID}.md`),
        { encoding: "utf-8" }
      )
  );
};

const createInstructionFromInstructionID = (
  instructionID: InstructionID
): PromiseLike<Instruction> => {
  return trace(
    "Create instruction",
    { "instruction.id": instructionID },
    async () => {
      const markdown: string = await loadMarkdown(instructionID);
      return createInstruction(instructionID, markdown);
    }
  );
};

const instructionsPromise: PromiseLike<Instruction[]> = trace(
  "Create instructions",
  {},
  () => {
    return Promise.all(
      InstructionIDs.map((instructionID) =>
        createInstructionFromInstructionID(instructionID)
      )
    );
  }
);

const instructionIDToInstructionMapPromise = instructionsPromise.then(
  (instructions) => {
    return new Map<InstructionID, Instruction>(
      instructions.map((instruction) => [instruction.id, instruction])
    );
  }
);

const instructionMetadataListPromise: PromiseLike<InstructionMetadata[]> =
  instructionsPromise.then((instructions) => {
    return instructions.map(
      (instruction): InstructionMetadata => ({
        id: instruction.id,
        name: instruction.name,
        sections: instruction.sections,
      })
    );
  });

export const getInstruction = async (
  id: InstructionID
): Promise<Instruction> => {
  const instructionIDToInstructionMap =
    await instructionIDToInstructionMapPromise;
  return requireDefined(
    instructionIDToInstructionMap.get(id),
    `Instruction for ${id}`
  );
};

export const getInstructionMetadataList = (): PromiseLike<
  InstructionMetadata[]
> => instructionMetadataListPromise;
