import * as fs from "fs";

export const writeBase64 = (
  filePath: string,
  base64: string
): PromiseLike<void> => {
  return new Promise<void>((resolve, reject) => {
    const resourceName = `a base64 file to ${filePath}`;
    console.log(`Writing ${resourceName}...`);
    fs.writeFile(filePath, base64, "base64", (error) => {
      if (error) {
        reject(error);
      } else {
        console.log(`Wrote ${resourceName}`);
        resolve();
      }
    });
  });
};

export const writeText = (
  filePath: string,
  content: string
): PromiseLike<void> => {
  return new Promise<void>((resolve, reject) => {
    const resourceName = `a text file to ${filePath}`;
    console.log(`Writing ${resourceName}...`);
    fs.writeFile(filePath, content, (error) => {
      if (error) {
        reject(error);
      } else {
        console.log(`Wrote ${resourceName}`);
        resolve();
      }
    });
  });
};
