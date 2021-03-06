import createCachedSelector from "re-reselect";
import { InstructionID } from "../../../common";
import { appAPIClient } from "../../infrastructure";

export const instructionHTMLSelector = createCachedSelector(
  (id: InstructionID): PromiseLike<string> =>
    appAPIClient.getInstructionHTML(id),
  (htmlPromise: PromiseLike<string>) => htmlPromise
)((id: InstructionID) => id);
