export enum ChapterID {
  JavaScriptBasics = "JavaScriptBasics",
  HTMLBasics = "HTMLBasics",
  CSSBasics = "CSSBasics",
  WebsiteBasics = "WebsiteBasics",
  FrontEndTODOAppWithReact = "FrontEndTODOAppWithReact",
  AboutNullToEngineer = "AboutNullToEngineer",
}

export enum InstructionID {
  JavaScriptBasics = "JavaScriptBasics",
  JavaScriptConditionalOperations = "JavaScriptConditionalOperations",
  JavaScriptObjectOperations = "JavaScriptObjectOperations",
  JavaScriptArrayOperations = "JavaScriptArrayOperations",
  JavaScriptLoopOperations = "JavaScriptLoopOperations",

  HTMLBasics = "HTMLBasics",

  CSSBasics = "CSSBasics",
  CSSAsElement = "CSSAsElement",
  CSSSelectors = "CSSSelectors",
  CSSAsFile = "CSSAsFile",

  WebsiteBasics = "WebsiteBasics",

  ReactBasics = "ReactBasics",
  ReactJSX = "ReactJSX",
  ReactComponent = "ReactComponent",

  SetupLocalJSDevEnv = "SetupLocalJSDevEnv",
  ReactInitializeTodoApp = "ReactInitializeTodoApp",

  AboutNullToEngineer = "AboutNullToEngineer",
}

export const DefaultInstructionID = InstructionID.JavaScriptBasics;

export interface Chapter {
  id: ChapterID;
  name: string;
  instructionIDs: InstructionID[];
}

export type Instruction = InstructionContent & InstructionMetadata;

export interface InstructionContent {
  id: InstructionID;
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
  JavaScriptHTMLCSS = "JavaScriptHTMLCSS",
  HTML = "HTML",
  HTMLWithCSS = "HTMLWithCSS",
  React = "React",
}

export interface InstructionConfiguration {
  id: InstructionID;
  fiddleType: FiddleType;
}

export const Chapters: Chapter[] = [
  {
    id: ChapterID.JavaScriptBasics,
    name: "JavaScript 基本編 🤖",
    instructionIDs: [
      InstructionID.JavaScriptBasics,
      InstructionID.JavaScriptConditionalOperations,
      InstructionID.JavaScriptObjectOperations,
      InstructionID.JavaScriptArrayOperations,
      InstructionID.JavaScriptLoopOperations,
    ],
  },
  {
    id: ChapterID.HTMLBasics,
    name: "HTML 基本編 🏠",
    instructionIDs: [InstructionID.HTMLBasics],
  },
  {
    id: ChapterID.CSSBasics,
    name: "CSS 基本編 🎨",
    instructionIDs: [
      InstructionID.CSSBasics,
      InstructionID.CSSAsElement,
      InstructionID.CSSSelectors,
      InstructionID.CSSAsFile,
    ],
  },
  {
    id: ChapterID.WebsiteBasics,
    name: "ウェブサイト基本編 🤩",
    instructionIDs: [InstructionID.WebsiteBasics],
  },
  {
    id: ChapterID.FrontEndTODOAppWithReact,
    name: "React 基本編 ✨",
    instructionIDs: [
      InstructionID.ReactBasics,
      InstructionID.ReactJSX,
      InstructionID.ReactComponent,
      InstructionID.SetupLocalJSDevEnv,
      InstructionID.ReactInitializeTodoApp,
    ],
  },
  {
    id: ChapterID.AboutNullToEngineer,
    name: "このサイトについて 💻",
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
    case InstructionID.CSSAsElement: {
      return {
        id,
        fiddleType: FiddleType.HTML,
      };
    }
    case InstructionID.CSSAsFile: {
      return {
        id,
        fiddleType: FiddleType.HTMLWithCSS,
      };
    }
    case InstructionID.CSSBasics: {
      return {
        id,
        fiddleType: FiddleType.HTML,
      };
    }
    case InstructionID.CSSSelectors: {
      return {
        id,
        fiddleType: FiddleType.HTML,
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
    case InstructionID.JavaScriptObjectOperations: {
      return {
        id,
        fiddleType: FiddleType.JavaScript,
      };
    }
    case InstructionID.ReactBasics: {
      return {
        id,
        fiddleType: FiddleType.HTML,
      };
    }
    case InstructionID.ReactComponent: {
      return {
        id,
        fiddleType: FiddleType.React,
      };
    }
    case InstructionID.ReactInitializeTodoApp: {
      return {
        id,
        fiddleType: FiddleType.None,
      };
    }
    case InstructionID.ReactJSX: {
      return {
        id,
        fiddleType: FiddleType.React,
      };
    }
    case InstructionID.SetupLocalJSDevEnv: {
      return {
        id,
        fiddleType: FiddleType.None,
      };
    }
    case InstructionID.WebsiteBasics: {
      return {
        id,
        fiddleType: FiddleType.JavaScriptHTMLCSS,
      };
    }
  }
};
