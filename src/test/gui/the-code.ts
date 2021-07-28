import { requireNonNull } from "../../common/utils";

let theJavaScript: string | null = null;
let theHTML: string | null = null;
let theCSS: string | null = null;

export const resetTheCode = () => {
  theJavaScript = null;
  theHTML = null;
  theCSS = null;
};

export const setTheJavaScript = (javaScript: string): void => {
  theJavaScript = javaScript;
};

export const getTheJavaScript = (): string =>
  requireNonNull(theJavaScript, "the JavaScript");

export const setTheHTML = (html: string): void => {
  theHTML = html;
};

export const getTheHTML = (): string => requireNonNull(theHTML, "the HTML");

export const setTheCSS = (css: string): void => {
  theCSS = css;
};

export const getTheCSS = (): string => requireNonNull(theCSS, "the CSS");
