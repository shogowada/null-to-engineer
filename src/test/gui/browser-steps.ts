import { Then } from "@cucumber/cucumber";
import { expect } from "chai";
import { logging } from "selenium-webdriver";
import { getBrowserLogEntries } from "./drivers";

Then(/^I should see no error log$/, async () => {
  const entries: logging.Entry[] = await getBrowserLogEntries();
  expect(entries.map((entry) => entry.level)).to.not.include(
    logging.Level.SEVERE
  );
});
