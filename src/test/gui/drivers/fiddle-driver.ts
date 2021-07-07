import { By } from "selenium-webdriver";
import { ElementID } from "../../../common";
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

export const getExecutionResult = (): PromiseLike<string> => {
  return getDriver()
    .findElement(By.id(ElementID.JavaScriptFiddleOutput))
    .getText();
};

export const executeHTML = (html: string) => {
  return setInputValue(
    getDriver().findElement(By.id(ElementID.HTMLFiddleCode)),
    html
  ).then(() => getDriver().findElement(By.id(ElementID.HTMLFiddleExecute)));
};
