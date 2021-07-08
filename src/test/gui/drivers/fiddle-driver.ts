import { By, WebElement } from "selenium-webdriver";
import { ElementID, retry } from "../../../common";
import { setInputValue } from "./input-driver";
import { getDriver } from "./driver";

export const executeJavaScript = (code: string) => {
  return setInputValue(
    getDriver().findElement(By.id(ElementID.JavaScriptFiddleCode)),
    code
  ).then(() =>
    getDriver().findElement(By.id(ElementID.JavaScriptFiddleExecute)).click()
  );
};

export const getJavaScriptExecutionResult = (): PromiseLike<string> => {
  return getDriver()
    .findElement(By.id(ElementID.JavaScriptFiddleOutput))
    .getText();
};

export const executeHTML = (html: string) => {
  return setInputValue(
    getDriver().findElement(By.id(ElementID.HTMLFiddleCode)),
    html
  ).then(() =>
    getDriver().findElement(By.id(ElementID.HTMLFiddleExecute)).click()
  );
};

export const getHTMLExecutionResult = async (): Promise<string> => {
  const iFrameElement: WebElement = await getDriver().findElement(
    By.id(ElementID.HTMLFiddleOutput)
  );
  return getDriver().executeScript<string>(
    `return arguments[0].contentDocument.body.innerHTML;`,
    iFrameElement
  );
};
