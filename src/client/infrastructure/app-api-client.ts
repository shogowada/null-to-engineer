import {
  Instruction,
  InstructionID,
  InstructionMetadata,
  RoutePath,
} from "../../common";

class AppAPIClient {
  async getInstruction(id: InstructionID): Promise<Instruction> {
    const response = await fetch(RoutePath.instructionJSON(id));
    return response.json();
  }

  async getInstructionMetadataList(): Promise<InstructionMetadata[]> {
    const response = await fetch(RoutePath.instructionMetadataListJSON);
    return response.json();
  }
}

export const appAPIClient = new AppAPIClient();
