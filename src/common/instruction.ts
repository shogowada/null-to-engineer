export enum ChapterID {
  JavaScriptBasics = "JavaScriptBasics",
}

export enum InstructionID {
  JavaScriptBasics = "JavaScriptBasics",
  JavaScriptConditionalOperations = "JavaScriptConditionalOperations",
  JavaScriptArrayOperations = "JavaScriptArrayOperations",
  JavaScriptLoopOperations = "JavaScriptLoopOperations",
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
];

export const InstructionIDs: InstructionID[] = Chapters.flatMap(
  (chapter) => chapter.instructionIDs
);
