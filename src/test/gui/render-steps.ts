import { Then } from "@cucumber/cucumber";
import { expect } from "chai";
import fetch from "node-fetch";
import {
  DefaultInstructionID,
  InstructionID,
  InstructionIDs,
  RoutePath,
} from "../../common";
import { appAPIClient, configuration } from "../infrastructure";

Then(/^it should render all instructions on server side$/, () => {
  return Promise.all([
    ...InstructionIDs.map(expectServerSideRendering),
    expectServerSideRenderingForPath(DefaultInstructionID, ""),
    expectServerSideRenderingForPath(DefaultInstructionID, "/"),
  ]);
});

const expectServerSideRendering = async (instructionID: InstructionID) => {
  return expectServerSideRenderingForPath(
    instructionID,
    RoutePath.instruction(instructionID)
  );
};

const expectServerSideRenderingForPath = async (
  instructionID: InstructionID,
  path: string
) => {
  const expectedHTML: string = await appAPIClient.getInstructionHTML(
    instructionID
  );

  const response = await fetch(`${configuration.targetURL}${path}`);
  const actualHTM: string = await response.text();

  expect(
    actualHTM,
    `Expected path "${path}" to render instruction for ${instructionID}`
  ).to.include(expectedHTML);
};
