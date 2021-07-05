export enum ChapterID {
  JavaScriptBasics = "JavaScriptBasics",
  AboutNullToEngineer = "AboutNullToEngineer",
}

export enum InstructionID {
  JavaScriptBasics = "JavaScriptBasics",
  JavaScriptConditionalOperations = "JavaScriptConditionalOperations",
  JavaScriptArrayOperations = "JavaScriptArrayOperations",
  JavaScriptLoopOperations = "JavaScriptLoopOperations",
  AboutNullToEngineer = "AboutNullToEngineer",
}

export interface Chapter {
  id: ChapterID;
  name: string;
  instructionIDs: InstructionID[];
}

export interface Instruction extends InstructionMetadata {
  html: string;
}

export interface InstructionMetadata {
  id: InstructionID;
  name: string;
  sections: string[];
}

export const Chapters: Chapter[] = [
  {
    id: ChapterID.JavaScriptBasics,
    name: "JavaScript 基本編 🥳",
    instructionIDs: [
      InstructionID.JavaScriptBasics,
      InstructionID.JavaScriptConditionalOperations,
      InstructionID.JavaScriptArrayOperations,
      InstructionID.JavaScriptLoopOperations,
    ],
  },
  {
    id: ChapterID.AboutNullToEngineer,
    name: "このサイトについて 🦋",
    instructionIDs: [InstructionID.AboutNullToEngineer],
  },
];

export const InstructionIDs: InstructionID[] = Chapters.flatMap(
  (chapter) => chapter.instructionIDs
);
