import { InstructionContent } from "../../../common";
import {
  AddInstructionContentAction,
  InstructionContentActionType,
} from "../actions";

type Action = AddInstructionContentAction;

export const instructionContents = (
  state: InstructionContent[] = [],
  action: Action
): InstructionContent[] => {
  switch (action.type) {
    case InstructionContentActionType.AddInstructionContent: {
      return [...state, action.content];
    }
    default: {
      return state;
    }
  }
};
