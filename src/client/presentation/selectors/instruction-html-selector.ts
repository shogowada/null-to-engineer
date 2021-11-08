import createCachedSelector from "re-reselect";
import { Instruction, InstructionID } from "../../../common";
import { appAPIClient } from "../../infrastructure";

export const instructionSelector = createCachedSelector(
  (id: InstructionID): PromiseLike<Instruction> =>
    appAPIClient.getInstruction(id),
  (instruction: PromiseLike<Instruction>) => instruction
)((id: InstructionID) => id);

export const instructionHTMLSelector = createCachedSelector(
  instructionSelector,
  (promisedInstruction: PromiseLike<Instruction>) =>
    promisedInstruction.then((instruction) => instruction.html)
)((id: InstructionID) => id);
