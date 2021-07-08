import "mocha";
import { expect } from "chai";
import { createAnchor } from "./create-anchor";

describe("createAnchor", () => {
  [
    { input: "こんにちは", output: "こんにちは" },
    { input: "こんにちは 赤ちゃん", output: "こんにちは-赤ちゃん" },
    { input: "こんにちは,赤ちゃん", output: "こんにちは赤ちゃん" },
    { input: "こんにちは,赤ちゃん!", output: "こんにちは赤ちゃん" },
    {
      input: "<h1>から<h6>",
      output: "h1からh6",
    },
  ].forEach(({ input, output }) => {
    describe(`creating an anchor from ${input}`, () => {
      let actual: string;

      beforeEach(() => {
        actual = createAnchor(input);
      });

      it(`should output ${output}`, () => {
        expect(actual).to.equal(output);
      });
    });
  });
});
