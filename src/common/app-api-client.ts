import fetch, { Response } from "node-fetch";
import { JSONRPCClient } from "json-rpc-2.0";
import { GetInstructionHTMLParams, JSONRPCMethodNames } from "./json-rpc";
import { InstructionID, InstructionMetadata } from "./instruction";

export class AppAPIClient {
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
      JSONRPCMethodNames.GetInstructionHTML,
      params
    );
  }

  getInstructionMetadataList(): PromiseLike<InstructionMetadata[]> {
    return this.jsonRPCClient.request(
      JSONRPCMethodNames.GetInstructionMetadataList
    );
  }

  getVersion(): PromiseLike<string> {
    return this.jsonRPCClient.request(JSONRPCMethodNames.GetVersion);
  }
}
