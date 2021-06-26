import { Key, WebElement } from "selenium-webdriver";

export const getInputValue = (element: WebElement): PromiseLike<string> =>
  element.getAttribute("value");

export const setInputValue = (
  element: WebElement,
  value: string | number
): PromiseLike<void> => {
  return getInputValue(element).then(
    (actualValue): PromiseLike<void> | void => {
      if (actualValue !== value) {
        return selectAll(element).then(
          (): PromiseLike<void> => element.sendKeys(value)
        );
      }
    }
  );
};

const selectAll = (element: WebElement): PromiseLike<void> => {
  return element.sendKeys(Key.chord(Key.CONTROL, "a"));
};
