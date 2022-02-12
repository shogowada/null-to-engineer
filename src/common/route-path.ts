import { InstructionID } from "./instruction";

const InstructionJSONBase = "/static/instructions";

export const RoutePath = {
  instruction: (id: InstructionID): string => {
    return RoutePath.instructionUnencoded(encodeURIComponent(id));
  },
  instructionUnencoded: (id: string): string => {
    return `/instructions/${id}`;
  },
  instructionJSONBase: InstructionJSONBase,
  instructionJSON: (id: InstructionID): string => {
    return `${InstructionJSONBase}/${encodeURIComponent(id)}.json`;
  },
  instructionMetadataListJSON: `${InstructionJSONBase}/metadata.json`,
};
