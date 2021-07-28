export const requireDefined = <T>(value: T | undefined, name: string): T => {
  if (value === undefined) {
    throw new Error(`Expected ${name} to be defined`);
  } else {
    return value;
  }
};

export const requireNonNull = <T>(value: T | null, name: string): T => {
  if (value === null) {
    throw new Error(`Expected ${name} to be non null`);
  } else {
    return value;
  }
};
