import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import { logging } from "selenium-webdriver";
import { wait } from "../../common";
import { getBrowserLogEntries, getDriver } from "./drivers";

Given(/^I wait for (\d+) seconds$/, (secondsString: string) => {
  const seconds: number = Number(secondsString);
  return wait(seconds * 1000);
});

When(/^I refresh the page$/, () => {
  return getDriver().navigate().refresh();
});

Then(/^I should see no error log$/, async () => {
  const entries: logging.Entry[] = await getBrowserLogEntries();
  expect(entries.map((entry) => entry.level)).to.not.include(
    logging.Level.SEVERE
  );
});
