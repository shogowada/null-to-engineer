import { Then } from "@cucumber/cucumber";
import { expect } from "chai";
import { appAPIClient } from "../infrastructure";

const packageJSON = require("../../../package.json");

Then(/^it should show me the app version$/, async () => {
  const version: string = await appAPIClient.getVersion();
  expect(version).to.equal(packageJSON.version);
});
