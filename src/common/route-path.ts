import { InstructionID } from "./instruction";

export const RoutePath = {
  instruction: (id: InstructionID): string => {
    return RoutePath.instructionUnencoded(encodeURIComponent(id));
  },
  instructionUnencoded: (id: string): string => {
    return `/instructions/${id}`;
  },
};
