import { InstructionID, requireNonNull } from "../../common";

let theInstructionID: InstructionID | null = null;

export const resetTheInstruction = () => {
  theInstructionID = null;
};

export const setTheInstructionID = (id: InstructionID): void => {
  theInstructionID = id;
};

export const getTheInstructionID = (): InstructionID =>
  requireNonNull(theInstructionID, "the instruction ID");
