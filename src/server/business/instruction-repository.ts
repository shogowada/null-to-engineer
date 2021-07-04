import * as path from "path";
import * as fs from "fs";
import * as marked from "marked";
import * as highlightJS from "highlight.js";
import {
  Dictionary,
  Instruction,
  InstructionID,
  InstructionIDs,
  InstructionMetadata,
} from "../../common";

const loadMarkdown = (instructionID: InstructionID): string => {
  return fs.readFileSync(
    path.join(__dirname, "instructions", `${instructionID}.md`),
    { encoding: "utf-8" }
  );
};

const createName = (
  instructionID: InstructionID,
  markdownLines: string[]
): string => {
  const groups = /^# (.+)/.exec(markdownLines[0]);
  if (groups) {
    return groups[1];
  } else {
    throw new Error(`Name is not found for instruction ${instructionID}`);
  }
};

const createSections = (markdownLines: string[]): string[] => {
  return markdownLines.reduce((sections: string[], line: string) => {
    const groups = /^## (.+)/.exec(line);
    if (groups) {
      return [...sections, groups[1]];
    } else {
      return sections;
    }
  }, []);
};

const createHTML = (markdown: string): string => {
  return marked(markdown, {
    highlight: (code: string, language: string): string => {
      return (highlightJS as any).highlight(code, { language }).value;
    },
  });
};

const createInstruction = (instructionID: InstructionID): Instruction => {
  const markdown: string = loadMarkdown(instructionID);
  const markdownLines: string[] = markdown.split(/[\n\r]/);
  return {
    id: instructionID,
    name: createName(instructionID, markdownLines),
    sections: createSections(markdownLines),
    html: createHTML(markdown),
  };
};

const instructions: Instruction[] = InstructionIDs.reduce(
  (instructions, instructionID: InstructionID): Instruction[] => [
    ...instructions,
    createInstruction(instructionID),
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
