export const createClassName = (classNames: (string | null)[]): string => {
  return classNames.filter((className) => className !== null).join(" ");
};
