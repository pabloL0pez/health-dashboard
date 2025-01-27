import { PerplexityService } from "../../layers/services/perplexity/perplexity.service";
import { isValidType } from "../../layers/utils/typeGuard";
import { HandlerResult } from "../types";
import { buildHandlerError } from "../utils";
import { ClaimsController } from "./claims.controller";
import { ClaimsEvent } from "./types";

class ClaimsHandler {
  constructor(private readonly claimsController: ClaimsController) {}

  async handleEvent(event: ClaimsEvent): HandlerResult {
    const claims = await this.claimsController.getClaims(event?.influencers);

    return {
      statusCode: 200,
      body: JSON.stringify(claims),
    };
  }
}

class ClaimsHandlerProvider {
  private static readonly controller: ClaimsController = new ClaimsController(PerplexityService.instance);
  private static readonly handler = new ClaimsHandler(this.controller);

  static inject() {
    return this.handler;
  }
}

export const handler = async (event: ClaimsEvent): HandlerResult => {
  if (!isValidType<ClaimsEvent>(['influencers'], event)) {
    return {
      statusCode: 400,
      body: buildHandlerError(event),
    }
  }

  const claimsHandler = ClaimsHandlerProvider.inject();
  return await claimsHandler.handleEvent(event);
}