import { Action } from "redux";
import { InstructionContent, InstructionID } from "../../../common";
import { AppDispatch } from "../app-dispatch";
import { AppState } from "../app-state";
import { instructionHTMLSelector } from "../selectors";

export enum InstructionContentActionType {
  AddInstructionContent = "ADD_INSTRUCTION_CONTENT",
}

export interface AddInstructionContentAction extends Action {
  type: InstructionContentActionType.AddInstructionContent;
  content: InstructionContent;
}

export const addInstructionContent = (
  content: InstructionContent
): AddInstructionContentAction => ({
  type: InstructionContentActionType.AddInstructionContent,
  content,
});

export const fetchInstructionContent =
  (id: InstructionID) =>
  async (
    dispatch: AppDispatch,
    getState: () => AppState
  ): Promise<InstructionContent> => {
    const content = getState().instructionContents.find(
      (content) => content.id === id
    );
    if (content) {
      return content;
    } else {
      const html: string = await instructionHTMLSelector(id);
      return dispatch(addInstructionContent({ id, html })).content;
    }
  };
