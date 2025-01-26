import { Handler, HandlerResult } from "../types";
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
  private static readonly model: InfluencersModel = new InfluencersModel();
  private static readonly handler = new InfluencersHandler(this.model);

  static inject() {
    return this.handler;
  }
}

export const handler = async (event: InfluencersEvent) => {
  const influencersHandler = InfluencersHandlerProvider.inject();
  return await influencersHandler.handleEvent(event);
};