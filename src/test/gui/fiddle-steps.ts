import { Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import {
  executeHTML,
  executeJavaScript,
  getJavaScriptExecutionResult,
  getHTMLExecutionResult,
  selectHTMLInstruction,
  selectJavaScriptInstruction,
} from "./drivers";

When(/^I execute the following JavaScript:$/, (code: string) => {
  return selectJavaScriptInstruction().then(() => executeJavaScript(code));
});

When(/^I execute the following HTML:$/, (html: string) => {
  return selectHTMLInstruction().then(() => executeHTML(html));
});

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
