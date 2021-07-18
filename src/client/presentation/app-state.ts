import { RouterRootState } from "connected-react-router";
import { InstructionContent, InstructionMetadata } from "../../common";

export interface AppState extends RouterRootState {
  instructionContents: InstructionContent[];
  instructionMetadataList: InstructionMetadata[];
}
