
import { MongoClient } from "../../layers/config/mongo/mongo";
import { PerplexityService } from "../../layers/services/perplexity/perplexity.service";
import { isValidType } from "../../layers/utils/typeGuard";
import { Handler, HandlerResult } from "../types";
import { buildHandlerError } from "../utils";
import { iInfluencersController, InfluencersController } from "./influencers.controller";
import { iInfluencerRepository, InfluencerRepositoryMongo, InfluencersRepository } from "./influencers.repository";
import { iInfluencersService, InfluencersService } from "./influencers.service";
import { InfluencersEvent } from "./types";

class InfluencersHandler implements Handler<InfluencersEvent> {
  constructor(private readonly influencersController: iInfluencersController) {}

  async handleEvent(event: InfluencersEvent): HandlerResult {
    const influencers = await this.influencersController.getInfluencers(event?.topN);

    return {
      statusCode: 200,
      body: JSON.stringify(influencers),
    };
  }
}

class InfluencersHandlerProvider {
  private static readonly dalRepository = new InfluencerRepositoryMongo();
  private static readonly repository: iInfluencerRepository = new InfluencersRepository(this.dalRepository);
  private static readonly service: iInfluencersService = new InfluencersService(PerplexityService.instance, this.repository);
  private static readonly controller: iInfluencersController = new InfluencersController(this.service);
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
    };
  }

  await MongoClient.instance.connect();

  const influencersHandler = InfluencersHandlerProvider.inject();
  const result = influencersHandler.handleEvent(event);

  return result;
};