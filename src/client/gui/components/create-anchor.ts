export const createAnchor = (text: string): string =>
  text
    .replace(/\s/g, "-")
    .replace(/[,!<>]/g, "")
    .toLowerCase();
