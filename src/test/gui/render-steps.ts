import { Then } from "@cucumber/cucumber";
import { expect } from "chai";
import fetch from "node-fetch";
import { InstructionID, InstructionIDs, RoutePath } from "../../common";
import { appAPIClient, configuration } from "../infrastructure";

Then(/^it should render all instructions on server side$/, () => {
  return Promise.all(InstructionIDs.map(expectServerSideRendering));
});

const expectServerSideRendering = async (instructionID: InstructionID) => {
  const expectedHTML: string = await appAPIClient.getInstructionHTML(
    instructionID
  );

  const response = await fetch(
    `${configuration.targetURL}${RoutePath.instruction(instructionID)}`
  );
  const actualHTM: string = await response.text();

  expect(actualHTM).to.include(expectedHTML);
};
