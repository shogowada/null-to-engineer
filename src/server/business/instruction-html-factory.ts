import * as path from "path";
import * as fs from "fs";
import * as marked from "marked";
import { Dictionary, InstructionID, InstructionIDs } from "../../common";

const instructionIDToHTMLDictionary: Dictionary<string> = InstructionIDs.reduce(
  (dictionary, instructionID: InstructionID) => {
    const markdown: string = fs.readFileSync(
      path.join(__dirname, "instructions", `${instructionID}.md`),
      { encoding: "utf-8" }
    );
    const html: string = marked(markdown);
    return {
      ...dictionary,
      [instructionID]: html,
    };
  },
  {}
);

export const createInstructionHTML = (id: InstructionID): string => {
  return instructionIDToHTMLDictionary[id];
};