import { marked } from "marked";
import * as highlightJS from "highlight.js";
import { Instruction, InstructionID } from "../../common";

marked.use({
  renderer: {
    link: (href: string, title: string, text: string): string => {
      const attributes: string = [
        `href="${href}"`,
        title ? `title="${title}"` : "",
        'target="_blank"',
      ]
        .filter((attribute) => attribute)
        .join(" ");
      return `<a ${attributes}>${text}</a>`;
    },
  },
});

export const createInstruction = (
  instructionID: InstructionID,
  markdown: string
): Instruction => {
  const markdownLines: string[] = markdown.split(/[\n\r]/);
  return {
    id: instructionID,
    name: createName(instructionID, markdownLines),
    sections: createSections(markdownLines),
    html: createHTML(markdown),
  };
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
      const section: string = groups[1].replace(/\\/g, "");
      return [...sections, section];
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
