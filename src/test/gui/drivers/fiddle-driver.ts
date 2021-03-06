import { By, WebElement } from "selenium-webdriver";
import { ConsoleLog, ConsoleLogLevel, ElementID } from "../../../common";
import { getInputValue, setInputValue } from "./input-driver";
import { getDriver } from "./driver";

export const executeJavaScript = (code: string) => {
  return setJavaScript(code).then(() =>
    getDriver().findElement(By.id(ElementID.JavaScriptFiddleExecute)).click()
  );
};

export const setJavaScript = (code: string) => {
  return setInputValue(
    getDriver().findElement(By.id(ElementID.JavaScriptFiddleCode)),
    code
  );
};

export const getJavaScript = (): PromiseLike<string> =>
  getInputValue(getDriver().findElement(By.id(ElementID.JavaScriptFiddleCode)));

export const getConsoleLogs = async (): Promise<ConsoleLog[]> => {
  const elements: WebElement[] = await selectConsoleLogTab().then(() =>
    getDriver()
      .findElement(By.id(ElementID.JavaScriptFiddleOutput))
      .findElements(By.css(".console-log"))
  );

  return Promise.all(elements.map(getConsoleLog));
};

const getConsoleLog = async (element: WebElement): Promise<ConsoleLog> => {
  const [message, level] = await Promise.all([
    element.getText(),
    element.getAttribute("data-level"),
  ]);
  return { level: level as ConsoleLogLevel, message };
};

const selectConsoleLogTab = () => {
  return getDriver()
    .findElement(By.css('[data-tab="ConsoleLog"]'))
    .then(
      (element) => element.click(),
      () => undefined
    );
};

export const executeHTML = (html: string) => {
  return setHTML(html).then(() =>
    getDriver().findElement(By.id(ElementID.HTMLFiddleExecute)).click()
  );
};

export const setHTML = (html: string) => {
  return setInputValue(
    getDriver().findElement(By.id(ElementID.HTMLFiddleCode)),
    html
  );
};

export const getHTML = (): PromiseLike<string> =>
  getInputValue(getDriver().findElement(By.id(ElementID.HTMLFiddleCode)));

export const executeHTMLWithCSS = (html: string, css: string) => {
  return setHTMLWithCSS(html, css).then(() =>
    getDriver().findElement(By.id(ElementID.HTMLFiddleExecute)).click()
  );
};

export const setHTMLWithCSS = (html: string, css: string) => {
  return setInputValue(
    getDriver().findElement(By.id(ElementID.HTMLFiddleCode)),
    html
  ).then(() =>
    setInputValue(getDriver().findElement(By.id(ElementID.CSSFiddleCode)), css)
  );
};

export const getCSS = (): PromiseLike<string> =>
  getInputValue(getDriver().findElement(By.id(ElementID.CSSFiddleCode)));

export const executeJavaScriptHTMLCSS = (
  javaScript: string,
  html: string,
  css: string
) => {
  return setJavaScriptHTMLCSS(javaScript, html, css).then(() =>
    getDriver().findElement(By.id(ElementID.HTMLFiddleExecute)).click()
  );
};

export const setJavaScriptHTMLCSS = (
  javaScript: string,
  html: string,
  css: string
) => {
  return setInputValue(
    getDriver().findElement(By.id(ElementID.JavaScriptFiddleCode)),
    javaScript
  )
    .then(() =>
      setInputValue(
        getDriver().findElement(By.id(ElementID.HTMLFiddleCode)),
        html
      )
    )
    .then(() =>
      setInputValue(
        getDriver().findElement(By.id(ElementID.CSSFiddleCode)),
        css
      )
    );
};

export const clickOnHTMLExecutionResult = async (cssSelector: string) => {
  const iFrameElement: WebElement = await getDriver().findElement(
    By.id(ElementID.HTMLFiddleOutput)
  );
  return getDriver().executeScript<string>(
    `const iFrameElement = arguments[0];
const cssSelector = arguments[1];
return iFrameElement.contentDocument.querySelector(cssSelector).click();`,
    iFrameElement,
    cssSelector
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

export const getHTMLExecutionResultStyle = async (
  cssSelector: string,
  styleName: string
): Promise<string> => {
  const iFrameElement: WebElement = await getDriver().findElement(
    By.id(ElementID.HTMLFiddleOutput)
  );
  return getDriver().executeScript<string>(
    `const iFrameElement = arguments[0];
const cssSelector = arguments[1];
const styleName = arguments[2];
return iFrameElement.contentWindow.getComputedStyle(
  iFrameElement.contentDocument.querySelector(cssSelector),
  null
)[styleName];`,
    iFrameElement,
    cssSelector,
    styleName
  );
};

export const getHTMLExecutionResultText = async (cssSelector: string) => {
  const iFrameElement: WebElement = await getDriver().findElement(
    By.id(ElementID.HTMLFiddleOutput)
  );
  return getDriver().executeScript<string>(
    `const iFrameElement = arguments[0];
const cssSelector = arguments[1];
return iFrameElement.contentDocument.querySelector(cssSelector).innerText`,
    iFrameElement,
    cssSelector
  );
};
