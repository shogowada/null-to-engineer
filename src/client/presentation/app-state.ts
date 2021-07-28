import { RouterRootState } from "connected-react-router";
import {
  Dictionary,
  InstructionContent,
  InstructionMetadata,
} from "../../common";
import { Code } from "./actions";

export interface AppState extends RouterRootState {
  instructionContents: InstructionContent[];
  instructionIDToCodeDictionary: Dictionary<Code>;
  instructionMetadataList: InstructionMetadata[];
}
