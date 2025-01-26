import { Handler } from "../types";
import { InfluencersModel } from "./influencers.model";
import { InfluencersEvent } from "./types";

class InfluencersHandler implements Handler {
  constructor(private readonly influencersModel: InfluencersModel) {}

  async handleEvent(event: InfluencersEvent): Promise<any> {
    return {
      statusCode: 200,
      body: JSON.stringify(this.influencersModel.getInfluencers(event?.topN))
    };
  }
}

class InfluencersHandlerProvider {
  private static readonly model: InfluencersModel = new InfluencersModel();
  private static readonly handler: Handler = new InfluencersHandler(this.model);

  static inject(): Handler {
    return this.handler;
  }
}

export const handler = async (event: InfluencersEvent): Promise<any> => {
  const influencersHandler = InfluencersHandlerProvider.inject();
  return await influencersHandler.handleEvent(event);
};