import fetch from "node-fetch";
import { StatusCodes } from "http-status-codes";
import { JSONRPCClient, JSONRPCRequest } from "json-rpc-2.0";
import { InstructionID } from "./instruction";
import { RoutePath } from "./route-path";
import { GetInstructionHTMLParams, JSONRPCMethodName } from "./json-rpc";

export class AppAPIClient {
  private jsonRPCClient: JSONRPCClient;

  constructor(url: string) {
    this.jsonRPCClient = new JSONRPCClient((request: JSONRPCRequest) => {
      return fetch(`${url}${RoutePath.jsonRPC}`, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        if (response.status === StatusCodes.OK) {
          const jsonRPCResponse = await response.json();
          this.jsonRPCClient.receive(jsonRPCResponse);
        }
      });
    });
  }

  getInstructionHTML(id: InstructionID): PromiseLike<string> {
    const params: GetInstructionHTMLParams = { id };
    return this.jsonRPCClient.request(
      JSONRPCMethodName.GetInstructionHTML,
      params
    );
  }
}
