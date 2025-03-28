import { MongoClient } from "@core/health-dashboard";
import { AIProviderType } from "../../layers/providers/types";
import { isValidType } from "../../layers/utils/typeGuard";
import { InfluencerRepositoryMongo } from "../influencers/influencers.repository";
import { HandlerEvent, HandlerProvider, HandlerResult } from "../types";
import { buildHandlerError, isValidaAIProviderModel } from "../utils";
import { ClaimsController } from "./claims.controller";
import { ClaimsRepository } from "./claims.repository";
import { ClaimsService } from "./claims.service";
import { ClaimsEvent } from "./types";

class ClaimsHandler {
  constructor(private readonly claimsController: ClaimsController) {}

  async handleEvent(event: ClaimsEvent): HandlerResult {
    const claims = await this.claimsController.getClaims(event?.influencers, event?.maxClaims);
    const influencers = claims.map(item => item.influencerName);

    return {
      statusCode: 200,
      statusDescription: `Updated database with claims: ${JSON.stringify(claims)}`,
      body: JSON.stringify(influencers),
    };
  }
}

class ClaimsHandlerProvider extends HandlerProvider {
  private readonly dalRepository = new InfluencerRepositoryMongo();
  private readonly repository = new ClaimsRepository(this.dalRepository);
  private readonly service = new ClaimsService(this.aiProvider, this.repository);
  private readonly controller = new ClaimsController(this.service);
  private readonly _handler = new ClaimsHandler(this.controller);

  public get handler() {
    return this._handler;
  }
}

export const handler = async ({ aiProviderModel = { provider: AIProviderType.Perplexity, model: 'sonar' }, ...event }: HandlerEvent<ClaimsEvent>): HandlerResult => {
  if (!isValidType<ClaimsEvent>(['influencers'], event)) {
    return {
      statusCode: 400,
      body: buildHandlerError(event),
    }
  }

  if (!isValidaAIProviderModel(aiProviderModel)) {
    return {
      statusCode: 400,
      body: `Invalid AI provider/model combination, received: ${JSON.stringify(aiProviderModel)}`,
    }
  }
 
  await MongoClient.instance.connect();

  const provider = new ClaimsHandlerProvider(aiProviderModel);
  const handler = provider.handler;
  const result = await handler.handleEvent(event);

  return result;
}