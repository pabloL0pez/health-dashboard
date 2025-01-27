import { PerplexityService } from "../../layers/services/perplexity/perplexity.service";
import { isValidType } from "../../layers/utils/typeGuard";
import { Handler, HandlerResult } from "../types";
import { buildHandlerError } from "../utils";
import { InfluencersController } from "./influencers.controller";
import { InfluencersEvent } from "./types";

class InfluencersHandler implements Handler<InfluencersEvent> {
  constructor(private readonly influencersController: InfluencersController) {}

  async handleEvent(event: InfluencersEvent): HandlerResult {
    const influencers = await this.influencersController.getInfluencers(event?.topN);

    return {
      statusCode: 200,
      body: JSON.stringify(influencers),
    };
  }
}

class InfluencersHandlerProvider {
  private static readonly controller: InfluencersController = new InfluencersController(PerplexityService.instance);
  private static readonly handler = new InfluencersHandler(this.controller);

  static inject() {
    return this.handler;
  }
}

export const handler = async (event: InfluencersEvent): HandlerResult => {
  if (!isValidType<InfluencersEvent>(['topN'], event)) {
    return {
      statusCode: 400,
      body: buildHandlerError(event),
    }
  }

  const influencersHandler = InfluencersHandlerProvider.inject();
  return await influencersHandler.handleEvent(event);
};