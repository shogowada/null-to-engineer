import { Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import { executeJavaScript, getExecutionResult } from "./drivers";

When(/^I execute the following JavaScript:$/, (code: string) => {
  return executeJavaScript(code);
});

Then(
  /^it should output the following execution result:$/,
  async (expected: string) => {
    const actual: string = await getExecutionResult();
    expect(actual).to.equal(expected);
  }
);
