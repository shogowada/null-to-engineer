import * as os from "os";
import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import {
  ConsoleLog,
  ConsoleLogLevel,
  eventually,
  FiddleType,
  getInstructionConfiguration,
  InstructionID,
  InstructionIDs,
} from "../../common";
import {
  clickOnHTMLExecutionResult,
  executeHTML,
  executeHTMLWithCSS,
  executeJavaScript,
  executeJavaScriptHTMLCSS,
  getConsoleLogs,
  getCSS,
  getHTML,
  getHTMLExecutionResult,
  getHTMLExecutionResultStyle,
  getHTMLExecutionResultText,
  getJavaScript,
  selectHTMLInstruction,
  selectHTMLWithCSSInstruction,
  selectInstruction,
  selectJavaScriptHTMLCSSInstruction,
  selectJavaScriptInstruction,
  setHTML,
  setHTMLWithCSS,
  setJavaScript,
  setJavaScriptHTMLCSS,
} from "./drivers";
import {
  getTheCSS,
  getTheHTML,
  getTheJavaScript,
  setTheCSS,
  setTheHTML,
  setTheJavaScript,
} from "./the-code";
import { getTheInstructionID, setTheInstructionID } from "./the-instruction";

Given(/^I have some code for (\w+) fiddle$/, (fiddleType: FiddleType) => {
  const instructionID: InstructionID = InstructionIDs.map(
    getInstructionConfiguration
  ).find((configuration) => configuration.fiddleType === fiddleType)!.id;
  setTheInstructionID(instructionID);

  const javaScript: string = `// JavaScript ${new Date()}`;
  const html: string = `<!-- HTML ${new Date()} -->`;
  const css: string = `/* CSS ${new Date()} */`;
  setTheJavaScript(javaScript);
  setTheHTML(html);
  setTheCSS(css);

  return selectInstruction(instructionID).then((): PromiseLike<unknown> => {
    switch (fiddleType) {
      case FiddleType.JavaScriptHTMLCSS: {
        return setJavaScriptHTMLCSS(javaScript, html, css);
      }
      case FiddleType.JavaScript: {
        return setJavaScript(javaScript);
      }
      case FiddleType.HTML: {
        return setHTML(html);
      }
      case FiddleType.HTMLWithCSS: {
        return setHTMLWithCSS(html, css);
      }
      default: {
        throw new Error(`Unsupported fiddle type ${fiddleType}`);
      }
    }
  });
});

When(/^I execute the following JavaScript:$/, (javaScript: string) => {
  return selectJavaScriptInstruction().then(() =>
    executeJavaScript(javaScript)
  );
});

When(/^I execute the following HTML:$/, (html: string) => {
  return selectHTMLInstruction().then(() => executeHTML(html));
});

When(/^I execute the following:$/, (code: string) => {
  const { html, css, javaScript } = extractFileContent(code);
  if (html && javaScript) {
    return selectJavaScriptHTMLCSSInstruction().then(() =>
      executeJavaScriptHTMLCSS(javaScript, html, css)
    );
  } else if (html && css) {
    return selectHTMLWithCSSInstruction().then(() =>
      executeHTMLWithCSS(html, css)
    );
  } else {
    throw new Error(`Unsupported code: ${code}`);
  }
});

interface FileContent {
  html: string;
  css: string;
  javaScript: string;
}

const extractFileContent = (code: string): FileContent => {
  const HTMLTag = "// HTML";
  const CSSTag = "// CSS";
  const JavaScriptTag = "// JavaScript";
  const Tags = [HTMLTag, CSSTag, JavaScriptTag];
  const lines: string[] = code.split(/[\n\r]/g);

  interface Accumulator {
    tag: string;
    content: FileContent;
  }

  return lines.reduce(
    (accumulator: Accumulator, line: string): Accumulator => {
      if (Tags.includes(line)) {
        return {
          ...accumulator,
          tag: line,
        };
      } else {
        switch (accumulator.tag) {
          case HTMLTag: {
            return {
              ...accumulator,
              content: {
                ...accumulator.content,
                html: `${accumulator.content.html}${os.EOL}${line}`,
              },
            };
          }
          case CSSTag: {
            return {
              ...accumulator,
              content: {
                ...accumulator.content,
                css: `${accumulator.content.css}${os.EOL}${line}`,
              },
            };
          }
          case JavaScriptTag: {
            return {
              ...accumulator,
              content: {
                ...accumulator.content,
                javaScript: `${accumulator.content.javaScript}${os.EOL}${line}`,
              },
            };
          }
          default: {
            throw new Error(`Unsupported tag: ${accumulator.tag}`);
          }
        }
      }
    },
    { tag: "", content: { html: "", css: "", javaScript: "" } }
  ).content;
};

When(/^I click on "([^"]+)" element$/, (cssSelector: string) => {
  return clickOnHTMLExecutionResult(cssSelector);
});

Then(
  /^it should output the following console logs:$/,
  async (dataTable: DataTable) => {
    const expected: ConsoleLog[] = dataTable.hashes();
    const actual: ConsoleLog[] = await getConsoleLogs();
    expect(expected).to.deep.equal(actual);
  }
);

Then(
  /^it should log an error containing "([^"]+)"$/,
  async (message: string) => {
    const logs: ConsoleLog[] = await getConsoleLogs();
    const errorLogs: ConsoleLog[] = logs.filter(
      (log) => log.level === ConsoleLogLevel.Error
    );
    expect(errorLogs).to.have.lengthOf(1);
    const errorLog: ConsoleLog = errorLogs[0];
    expect(errorLog.message).to.contain(message);
  }
);

Then(/^it should output the following HTML:$/, async (expectedHTML: string) => {
  return eventually(
    async () => {
      const actualHTML: string = await getHTMLExecutionResult();
      expect(actualHTML).to.equal(expectedHTML);
    },
    { timeout: 5 * 1000, interval: 250 }
  );
});

Then(
  /^"([^"]+)" element should have "([^"]+)" styled as "([^"]*)"$/,
  async (cssSelector: string, styleName: string, expectedValue: string) => {
    const value: string = await getHTMLExecutionResultStyle(
      cssSelector,
      styleName
    );
    expect(value).to.equal(expectedValue);
  }
);

Then(
  /^"([^"]+)" element should say "([^"]+)"$/,
  async (cssSelector: string, text: string) => {
    const value: string = await getHTMLExecutionResultText(cssSelector);
    expect(value).to.equal(text);
  }
);

Then(/^it should remember the code$/, async () => {
  const fiddleType: FiddleType = getInstructionConfiguration(
    getTheInstructionID()
  ).fiddleType;

  switch (fiddleType) {
    case FiddleType.HTML: {
      const html: string = await getHTML();
      expect(html).to.equal(getTheHTML());
      break;
    }
    case FiddleType.HTMLWithCSS: {
      const [html, css] = await Promise.all([getHTML(), getCSS()]);
      expect(html).to.equal(getTheHTML());
      expect(css).to.equal(getTheCSS());
      break;
    }
    case FiddleType.JavaScript: {
      const javaScript: string = await getJavaScript();
      expect(javaScript).to.equal(getTheJavaScript());
      break;
    }
    case FiddleType.JavaScriptHTMLCSS: {
      const [javaScript, html, css] = await Promise.all([
        getJavaScript(),
        getHTML(),
        getCSS(),
      ]);
      expect(javaScript).to.equal(getTheJavaScript());
      expect(html).to.equal(getTheHTML());
      expect(css).to.equal(getTheCSS());
      break;
    }
    default: {
      throw new Error(`Unsupported fiddle type ${fiddleType}`);
    }
  }
});
