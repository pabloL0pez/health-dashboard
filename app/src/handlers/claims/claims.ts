import { PerplexityService } from "../../layers/services/perplexity/perplexity.service";
import { isValidType } from "../../layers/utils/typeGuard";
import { HandlerResult } from "../types";
import { buildHandlerError } from "../utils";
import { ClaimsModel } from "./claims.model";
import { ClaimsEvent } from "./types";

class ClaimsHandler {
  constructor(private readonly claimsModel: ClaimsModel) {}

  async handleEvent(event: ClaimsEvent): HandlerResult {
    const claims = await this.claimsModel.getClaims(event?.influencers);

    return {
      statusCode: 200,
      body: JSON.stringify(claims),
    };
  }
}

class ClaimsHandlerProvider {
  private static readonly model: ClaimsModel = new ClaimsModel(PerplexityService.instance);
  private static readonly handler = new ClaimsHandler(this.model);

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