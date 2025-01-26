import { Handler } from "../types";
import { InfluencersModel } from "./influencers.model";

class InfluencersHandler implements Handler {
  constructor(private readonly influencersModel: InfluencersModel) {}

  async handleEvent(event: any): Promise<any> {
    return {
      statusCode: 200,
      body: JSON.stringify(this.influencersModel.getInfluencers())
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

export const handler = async (event: any): Promise<any> => {
  const influencersHandler = InfluencersHandlerProvider.inject();
  return await influencersHandler.handleEvent(event);
};