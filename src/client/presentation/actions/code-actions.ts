import { InstructionID } from "../../../common";

export interface Code {
  instructionID: InstructionID;
  javaScript?: string;
  html?: string;
  css?: string;
}

export enum CodeActionType {
  UpsertCode = "UPSERT_CODE",
}

export interface UpsertCodeAction {
  type: CodeActionType.UpsertCode;
  code: Code;
}

export const upsertCode = (code: Code): UpsertCodeAction => ({
  type: CodeActionType.UpsertCode,
  code,
});
