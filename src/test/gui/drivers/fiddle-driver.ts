import { By } from "selenium-webdriver";
import { ElementID } from "../../../common";
import { setInputValue } from "./input-driver";
import { getDriver } from "./driver";

export const executeJavaScript = (code: string) => {
  return setInputValue(
    getDriver().findElement(By.id(ElementID.FiddleCode)),
    code
  ).then(() => getDriver().findElement(By.id(ElementID.FiddleExecute)).click());
};

export const getExecutionResult = (): PromiseLike<string> => {
  return getDriver().findElement(By.id(ElementID.FiddleOutput)).getText();
};
