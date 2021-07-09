import "mocha";
import { expect } from "chai";
import { Instruction, InstructionID } from "../../common";
import { createInstruction } from "./instruction-factory";

describe("createInstruction", () => {
  describe("creating an instruction", () => {
    let instructionID: InstructionID;
    let name: string;
    let actual: Instruction;

    beforeEach(() => {
      instructionID = InstructionID.HTMLBasics;
      name = "名前はここ！";

      actual = createInstruction(
        instructionID,
        `# ${name}

## 最初の見出し

## \\<h1>から\\<h6>
`
      );
    });

    it("should extract a name", () => {
      expect(actual.name).to.equal(name);
    });

    it("should extract sections", () => {
      expect(actual.sections).to.deep.equal(["最初の見出し", "<h1>から<h6>"]);
    });
  });
});
