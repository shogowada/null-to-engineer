import { AppAPIClient } from "../../common";
import { configuration } from "./configuration";

export const appAPIClient = new AppAPIClient(configuration.targetURL);
