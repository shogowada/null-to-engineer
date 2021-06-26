import * as os from "os";
import { Browser, Builder, logging, WebDriver } from "selenium-webdriver";

let driver: WebDriver | null = null;

export const getDriver = (): WebDriver => {
  if (!driver) {
    driver = new Builder()
      .forBrowser(Browser.CHROME)
      .setLoggingPrefs(getLoggingPrefs())
      .build();
  }
  return driver;
};

const getLoggingPrefs = (): logging.Preferences => {
  const prefs = new logging.Preferences();
  prefs.setLevel(logging.Type.BROWSER, logging.Level.DEBUG);
  return prefs;
};

export const getBrowserLogs = async (): Promise<string> => {
  const entries: logging.Entry[] = await getDriver()
    .manage()
    .logs()
    .get(logging.Type.BROWSER);

  return entries
    .map(
      (entry) =>
        `${new Date(entry.timestamp).toISOString()} [${entry.level}] ${
          entry.message
        }`
    )
    .join(os.EOL);
};

export const clearBrowserLogs = getBrowserLogs;

export const quitDriver = (): PromiseLike<unknown> => {
  return getDriver()
    .quit()
    .then(() => (driver = null));
};
