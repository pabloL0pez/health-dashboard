
import { MongoClient } from "../../layers/config/mongo/mongo";
import { PerplexityProvider } from "../../layers/providers/perplexity/perplexity.provider";
import { PerplexityLLMType } from "../../layers/providers/perplexity/types";
import { isValidType } from "../../layers/utils/typeGuard";
import { Handler, HandlerResult } from "../types";
import { buildHandlerError } from "../utils";
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

class InfluencersHandlerProvider {
  private static readonly dalRepository = new InfluencerRepositoryMongo();
  private static readonly repository = new InfluencersRepository(this.dalRepository);
  private static readonly aiProvider = new PerplexityProvider(PerplexityLLMType.Sonar);
  private static readonly service = new InfluencersService(this.aiProvider, this.repository);
  private static readonly controller = new InfluencersController(this.service);
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