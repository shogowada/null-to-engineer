import { RouterRootState } from "connected-react-router";
import { InstructionContent } from "../../common";

export interface AppState extends RouterRootState {
  instructionContents: InstructionContent[];
}
