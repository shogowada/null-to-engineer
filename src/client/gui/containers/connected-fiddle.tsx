import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InstructionID } from "../../../common";
import { AppDispatch, AppState, Code, upsertCode } from "../../presentation";
import { Fiddle } from "../components/fiddle";

interface Props {
  instructionID: InstructionID;
}

export const ConnectedFiddle: React.FunctionComponent<Props> = (
  props: Props
) => {
  const dispatch: AppDispatch = useDispatch();
  const code: Code = useSelector((state: AppState) => {
    return (
      state.instructionIDToCodeDictionary[props.instructionID] || {
        instructionID: props.instructionID,
      }
    );
  });

  const setCode = (code: Code): void => {
    dispatch(upsertCode(code));
  };

  return <Fiddle code={code} setCode={setCode} />;
};
