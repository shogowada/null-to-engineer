import * as os from "os";
import { Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import {
  executeHTML,
  executeJavaScript,
  getJavaScriptExecutionResult,
  getHTMLExecutionResult,
  selectHTMLInstruction,
  selectJavaScriptInstruction,
  selectHTMLWithCSSInstruction,
  executeHTMLWithCSS,
  getHTMLExecutionResultStyle,
} from "./drivers";
import { WebElement } from "selenium-webdriver";

When(/^I execute the following JavaScript:$/, (javaScript: string) => {
  return selectJavaScriptInstruction().then(() =>
    executeJavaScript(javaScript)
  );
});

When(/^I execute the following HTML:$/, (html: string) => {
  return selectHTMLInstruction().then(() => executeHTML(html));
});

When(/^I execute the following:$/, (code: string) => {
  const { html, css } = extractFileContent(code);
  if (html && css) {
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
}

const extractFileContent = (code: string): FileContent => {
  const HTMLTag = "// HTML";
  const CSSTag = "// CSS";
  const Tags = [HTMLTag, CSSTag];
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
          default: {
            throw new Error(`Unsupported tag: ${accumulator.tag}`);
          }
        }
      }
    },
    { tag: "", content: { html: "", css: "" } }
  ).content;
};

Then(
  /^it should output the following execution result:$/,
  async (expected: string) => {
    const actual: string = await getJavaScriptExecutionResult();
    expect(actual).to.equal(expected);
  }
);

Then(/^it should output the following HTML:$/, async (expectedHTML: string) => {
  const actualHTML: string = await getHTMLExecutionResult();
  expect(actualHTML).to.equal(expectedHTML);
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
