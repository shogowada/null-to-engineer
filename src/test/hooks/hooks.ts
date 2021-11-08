import { Before, setDefaultTimeout } from "@cucumber/cucumber";
import fetch from "node-fetch";
import { eventually } from "../../common";
import { configuration } from "../infrastructure";

setDefaultTimeout(configuration.defaultTimeout);

Before(() => {
  return eventually(
    async () => {
      const response = await fetch(configuration.targetURL);
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
    },
    {
      timeout: 10 * 1000,
      interval: 250,
    }
  );
});
