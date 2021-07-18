import * as fs from "fs";
import * as path from "path";
import { InstructionMetadata } from "./common";
import { getInstructionMetadataList } from "./server/business";

const instructionMetadataList: InstructionMetadata[] =
  getInstructionMetadataList();

fs.writeFileSync(
  path.join(__dirname, "common", "instruction-metadata-list.ts"),
  `// このファイルは /src/generate-code.ts によって作られました。
import {InstructionID,InstructionMetadata} from "./instruction";

export const InstructionMetadataList: InstructionMetadata[] = [${instructionMetadataList
    .map(({ id, name, sections }) => {
      return `{"id": InstructionID.${id},"name":${JSON.stringify(
        name
      )},"sections":${JSON.stringify(sections)}}`;
    })
    .join(",")}];`
);
