import { Then, When } from "@cucumber/cucumber";
import { expect } from "chai";
import { logging } from "selenium-webdriver";
import { getBrowserLogEntries, getDriver } from "./drivers";

When(/^I refresh the page$/, () => {
  return getDriver().navigate().refresh();
});

Then(/^I should see no error log$/, async () => {
  const entries: logging.Entry[] = await getBrowserLogEntries();
  expect(entries.map((entry) => entry.level)).to.not.include(
    logging.Level.SEVERE
  );
});
