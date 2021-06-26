import * as path from "path";
import { After, AfterAll, Before } from "@cucumber/cucumber";
import { TestStepResultStatus } from "@cucumber/messages";
import { configuration, writeBase64, writeText } from "../../infrastructure";
import {
  clearBrowserLogs,
  getBrowserLogs,
  getDriver,
  quitDriver,
} from "../drivers";

Before(() => {
  return clearBrowserLogs().then(() =>
    getDriver().navigate().to(configuration.targetURL)
  );
});

After(({ gherkinDocument, result }) => {
  if (result!.status === TestStepResultStatus.FAILED) {
    return logFailure(
      gherkinDocument.uri!,
      gherkinDocument.feature!.location.line
    );
  }
});

const logFailure = (uri: string, line: number) => {
  const fileNamePrefix = `${uri.replace(/[^\w]/, "-")}.${line}`;
  return Promise.all([
    getBrowserLogs().then((logs: string) =>
      writeText(
        path.join(configuration.logDirPath, `${fileNamePrefix}.console.log`),
        logs
      )
    ),
    getDriver()
      .getPageSource()
      .then((html: string) =>
        writeText(
          path.join(configuration.logDirPath, `${fileNamePrefix}.html`),
          html
        )
      ),
    getDriver()
      .takeScreenshot()
      .then((base64Screenshot: string) =>
        writeBase64(
          path.join(configuration.logDirPath, `${fileNamePrefix}.png`),
          base64Screenshot
        )
      ),
  ]);
};

AfterAll(() => quitDriver());
