import { Dictionary } from "../../../common";
import { Code, CodeActionType, UpsertCodeAction } from "../actions";

type Action = UpsertCodeAction;

export const instructionIDToCodeDictionary = (
  state: Dictionary<Code> = {},
  action: Action
): Dictionary<Code> => {
  switch (action.type) {
    case CodeActionType.UpsertCode: {
      return {
        ...state,
        [action.code.instructionID]: action.code,
      };
    }
    default: {
      return state;
    }
  }
};
