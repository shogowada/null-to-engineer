import fetch, { Response } from "node-fetch";
import { JSONRPCClient } from "json-rpc-2.0";
import { InstructionID } from "../instruction";
import { GetInstructionHTMLParams, JSONRPCMethods } from "./json-rpc-methods";

export class JSONRPCAPIClient {
  private jsonRPCClient: JSONRPCClient;

  constructor(url: string) {
    this.jsonRPCClient = new JSONRPCClient(async (request): Promise<void> => {
      const response: Response = await fetch(`${url}/webapi/json-rpc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      if (response.status === 200) {
        return response
          .json()
          .then((payload) => this.jsonRPCClient.receive(payload));
      } else if (request.id !== undefined) {
        return Promise.reject(new Error(response.statusText));
      }
    });
  }

  getInstructionHTML(id: InstructionID): PromiseLike<string> {
    const params: GetInstructionHTMLParams = { id };
    return this.jsonRPCClient.request(
      JSONRPCMethods.GetInstructionHTML,
      params
    );
  }
}
