export enum ChapterID {
  JavaScript = "JavaScript",
}

export enum InstructionID {
  JavaScriptBasics = "JavaScriptBasics",
  JavaScriptArrayOperations = "JavaScriptArrayOperations",
  JavaScriptLoopOperations = "JavaScriptLoopOperations",
}

export interface Chapter {
  id: ChapterID;
  instructionIDs: InstructionID[];
}

export const Chapters: Chapter[] = [
  {
    id: ChapterID.JavaScript,
    instructionIDs: [
      InstructionID.JavaScriptBasics,
      InstructionID.JavaScriptArrayOperations,
      InstructionID.JavaScriptLoopOperations,
    ],
  },
];
