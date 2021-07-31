import { Before } from "@cucumber/cucumber";
import { eventually } from "../../common";
import { appAPIClient } from "../infrastructure";

Before(() => {
  return eventually(() => appAPIClient.getVersion(), {
    timeout: 10 * 1000,
    interval: 250,
  });
});
