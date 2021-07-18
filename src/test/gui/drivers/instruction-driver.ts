import { By, WebElement } from "selenium-webdriver";
import {
  FiddleType,
  getInstructionConfiguration,
  InstructionID,
  InstructionIDs,
  requireDefined,
} from "../../../common";
import { getDriver } from "./driver";

export const selectJavaScriptInstruction = () =>
  selectInstructionByFiddleType(FiddleType.JavaScript);

export const selectHTMLInstruction = () =>
  selectInstructionByFiddleType(FiddleType.HTML);

export const selectHTMLWithCSSInstruction = () =>
  selectInstructionByFiddleType(FiddleType.HTMLWithCSS);

export const selectJavaScriptHTMLCSSInstruction = () =>
  selectInstructionByFiddleType(FiddleType.JavaScriptHTMLCSS);

const selectInstructionByFiddleType = (fiddleType: FiddleType) => {
  const javaScriptInstructionID: InstructionID = requireDefined(
    InstructionIDs.find(
      (instructionID) =>
        getInstructionConfiguration(instructionID).fiddleType === fiddleType
    ),
    `${fiddleType} instruction ID`
  );
  return selectInstruction(javaScriptInstructionID);
};

export const selectInstruction = async (id: InstructionID) => {
  const element: WebElement = await getDriver().findElement(
    By.css(`[data-instruction-id="${id}"]`)
  );
  return element.click();
};
