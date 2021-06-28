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
  instructionIDs: InstructionID[];
}

export const Chapters: Chapter[] = [
  {
    id: ChapterID.JavaScriptBasics,
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
