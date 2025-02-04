
import { MongoClient } from "../../layers/config/mongo/mongo";
import { isValidType } from "../../layers/utils/typeGuard";
import { Handler, HandlerEvent, HandlerProvider, HandlerResult } from "../types";
import { buildHandlerError, isValidaAIProviderModel } from "../utils";
import { iInfluencersController, InfluencersController } from "./influencers.controller";
import { InfluencerRepositoryMongo, InfluencersRepository } from "./influencers.repository";
import { InfluencersService } from "./influencers.service";
import { InfluencersEvent } from "./types";

class InfluencersHandler implements Handler<InfluencersEvent> {
  constructor(private readonly influencersController: iInfluencersController) {}

  async handleEvent(event: InfluencersEvent): HandlerResult {
    const influencers = await this.influencersController.getInfluencers(event?.topN);

    return {
      statusCode: 200,
      statusDescription: `Updated database with current top ${influencers.length} influencers: `,
      body: JSON.stringify(influencers),
    };
  }
}

class InfluencersHandlerProvider extends HandlerProvider {
  private readonly dalRepository = new InfluencerRepositoryMongo();
  private readonly repository = new InfluencersRepository(this.dalRepository);
  private readonly service = new InfluencersService(this.aiProvider, this.repository);
  private readonly controller = new InfluencersController(this.service);
  private readonly _handler = new InfluencersHandler(this.controller);

  public get handler() {
    return this._handler;
  }
}

export const handler = async ({ aiProviderModel, ...event }: HandlerEvent<InfluencersEvent>): HandlerResult => {
  if (!isValidType<InfluencersEvent>(['topN'], event)) {
    return {
      statusCode: 400,
      body: buildHandlerError(event),
    };
  }

  if (!isValidaAIProviderModel(aiProviderModel)) {
    return {
      statusCode: 400,
      body: `Invalid AI provider/model combination, received: ${JSON.stringify(aiProviderModel)}`,
    }
  }

  await MongoClient.instance.connect();

  const provider = new InfluencersHandlerProvider(aiProviderModel)
  const handler = provider.handler;
  const result = handler.handleEvent(event);

  return result;
};