import { Before, setDefaultTimeout } from "@cucumber/cucumber";
import { eventually } from "../../common";
import { appAPIClient, configuration } from "../infrastructure";

setDefaultTimeout(configuration.defaultTimeout);

Before(() => {
  return eventually(() => appAPIClient.getVersion(), {
    timeout: 10 * 1000,
    interval: 250,
  });
});
