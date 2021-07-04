export const createAnchor = (text: string): string =>
  text.replace(/\s/g, "-").toLowerCase();
