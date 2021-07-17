import * as React from "react";

interface CompileHTMLOptions {
  html: string;
  css: string;
  javaScript?: string;
}

const CSSType = "text/css";
const JavaScriptType = "text/javascript";

export const useCompiledHTML = (): [
  string,
  (options: CompileHTMLOptions) => void
] => {
  const [compiledHTML, setCompiledHTML] = React.useState<string>("");
  const [cssObjectURL, setCSSObjectURL] = React.useState<string | null>(null);
  const [javaScriptObjectURL, setJavaScriptObjectURL] = React.useState<
    string | null
  >(null);

  React.useEffect(() => {
    return () => {
      if (cssObjectURL !== null) {
        URL.revokeObjectURL(cssObjectURL);
      }
    };
  }, [cssObjectURL]);

  React.useEffect(() => {
    return () => {
      if (javaScriptObjectURL !== null) {
        URL.revokeObjectURL(javaScriptObjectURL);
      }
    };
  }, [javaScriptObjectURL]);

  const compileHTML = ({ html, css, javaScript }: CompileHTMLOptions): void => {
    const cssObjectURL = createURL(css, CSSType);
    const javaScriptObjectURL = createURL(javaScript || "", JavaScriptType);

    setCSSObjectURL(cssObjectURL);
    setJavaScriptObjectURL(javaScriptObjectURL);

    const linkElement: string = `<link rel="stylesheet" type="${CSSType}" href="${cssObjectURL}">`;
    const scriptElement: string = `<script defer type="${JavaScriptType}" src="${javaScriptObjectURL}"></script>`;

    setCompiledHTML(`${linkElement}
${scriptElement}
${html}`);
  };

  return [compiledHTML, compileHTML];
};

const createURL = (input: string, type: string): string => {
  const blob = new Blob([input], { type });
  return URL.createObjectURL(blob);
};
