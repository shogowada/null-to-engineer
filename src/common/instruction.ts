export enum ChapterID {
  JavaScriptBasics = "JavaScriptBasics",
  HTMLBasics = "HTMLBasics",
  AboutNullToEngineer = "AboutNullToEngineer",
}

export enum InstructionID {
  JavaScriptBasics = "JavaScriptBasics",
  JavaScriptConditionalOperations = "JavaScriptConditionalOperations",
  JavaScriptArrayOperations = "JavaScriptArrayOperations",
  JavaScriptLoopOperations = "JavaScriptLoopOperations",

  HTMLBasics = "HTMLBasics",

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

export enum FiddleType {
  None = "None",
  JavaScript = "JavaScript",
  HTML = "HTML",
}

export interface InstructionConfiguration {
  id: InstructionID;
  fiddleType: FiddleType;
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
    id: ChapterID.HTMLBasics,
    name: "HTML 基本編 ✍️",
    instructionIDs: [InstructionID.HTMLBasics],
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

export const getInstructionConfiguration = (
  id: InstructionID
): InstructionConfiguration => {
  switch (id) {
    case InstructionID.AboutNullToEngineer: {
      return {
        id,
        fiddleType: FiddleType.None,
      };
    }
    case InstructionID.HTMLBasics: {
      return {
        id,
        fiddleType: FiddleType.HTML,
      };
    }
    case InstructionID.JavaScriptArrayOperations: {
      return {
        id,
        fiddleType: FiddleType.JavaScript,
      };
    }
    case InstructionID.JavaScriptBasics: {
      return {
        id,
        fiddleType: FiddleType.JavaScript,
      };
    }
    case InstructionID.JavaScriptConditionalOperations: {
      return {
        id,
        fiddleType: FiddleType.JavaScript,
      };
    }
    case InstructionID.JavaScriptLoopOperations: {
      return {
        id,
        fiddleType: FiddleType.JavaScript,
      };
    }
  }
};
