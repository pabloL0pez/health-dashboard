import { PerplexityService } from "../../layers/services/perplexity/perplexity.service";
import { isValidType } from "../../layers/utils/typeGuard";
import { Handler, HandlerError, HandlerResult } from "../types";
import { buildHandlerError } from "../utils";
import { InfluencersModel } from "./influencers.model";
import { InfluencersEvent } from "./types";

class InfluencersHandler implements Handler<InfluencersEvent> {
  constructor(private readonly influencersModel: InfluencersModel) {}

  async handleEvent(event: InfluencersEvent): HandlerResult {
    const influencers = await this.influencersModel.getInfluencers(event?.topN);

    return {
      statusCode: 200,
      body: JSON.stringify(influencers),
    };
  }
}

class InfluencersHandlerProvider {
  private static readonly model: InfluencersModel = new InfluencersModel(PerplexityService.instance);
  private static readonly handler = new InfluencersHandler(this.model);

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