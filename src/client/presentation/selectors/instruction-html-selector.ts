import createCachedSelector from "re-reselect";
import { InstructionID, InstructionMetadataList } from "../../../common";
import { appAPIClient } from "../../infrastructure";

export const instructionHTMLSelector = createCachedSelector(
  (id: InstructionID): PromiseLike<string> =>
    appAPIClient.getInstructionHTML(id).then(undefined, (error) => {
      const metadata = InstructionMetadataList.find(
        (metadata) => metadata.id === id
      )!;
      return `「${metadata.name}」の読み込みに失敗しちゃった 🤭<br />後でもう一度試してみて 🙏`;
    }),
  (promisedHTML: PromiseLike<string>) => promisedHTML
)((id: InstructionID) => id);
