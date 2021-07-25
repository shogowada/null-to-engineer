import * as os from "os";
import { DataTable, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import { ConsoleLog, ConsoleLogLevel, eventually } from "../../common";
import {
  clickOnHTMLExecutionResult,
  executeHTML,
  executeHTMLWithCSS,
  executeJavaScript,
  executeJavaScriptHTMLCSS,
  getConsoleLogs,
  getHTMLExecutionResult,
  getHTMLExecutionResultStyle,
  getHTMLExecutionResultText,
  selectHTMLInstruction,
  selectHTMLWithCSSInstruction,
  selectJavaScriptHTMLCSSInstruction,
  selectJavaScriptInstruction,
} from "./drivers";

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
