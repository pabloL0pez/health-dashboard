import { MongoClient } from "../../layers/config/mongo/mongo";
import { AIProviderType } from "../../layers/providers/types";
import { isValidType } from "../../layers/utils/typeGuard";
import { ClaimsRepository } from "../claims/claims.repository";
import { InfluencerRepositoryMongo } from "../influencers/influencers.repository";
import { HandlerEvent, HandlerProvider, HandlerResult } from "../types";
import { buildHandlerError, isValidaAIProviderModel } from "../utils";
import { ClaimsVerificationController } from "./claims-verification.controller";
import { ClaimsVerificationRepository } from "./claims-verification.repository";
import { ClaimsVerificationService } from "./claims-verification.service";
import { ClaimsVerificationEvent } from "./types";

class ClaimsVerificationHandler {
  constructor(private readonly claimsVerificationController: ClaimsVerificationController) {}

  async handleEvent(event: ClaimsVerificationEvent): HandlerResult {
    const claims = await this.claimsVerificationController.getVerifiedClaims(event?.influencerName);

    return {
      statusCode: 200,
      statusDescription: `Updated database with claims: `,
      body: JSON.stringify(claims),
    };
  }
}

class ClaimsVerificationHandlerProvider extends HandlerProvider {
  private readonly dalRepository = new InfluencerRepositoryMongo();
  private readonly claimsVerificationRepository = new ClaimsVerificationRepository(this.dalRepository);
  private readonly claimsRepository = new ClaimsRepository(this.dalRepository);
  private readonly service = new ClaimsVerificationService(this.aiProvider, this.claimsRepository, this.claimsVerificationRepository);
  private readonly controller = new ClaimsVerificationController(this.service);
  private readonly _handler = new ClaimsVerificationHandler(this.controller);

  public get handler() {
    return this._handler;
  }
}

export const handler = async ({ aiProviderModel = { provider: AIProviderType.Perplexity, model: 'sonar' }, ...event }: HandlerEvent<ClaimsVerificationEvent>): HandlerResult => {
  if (!isValidType<ClaimsVerificationEvent>(['influencerName'], event)) {
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

  const provider = new ClaimsVerificationHandlerProvider(aiProviderModel);
  const handler = provider.handler;
  const result = await handler.handleEvent(event);

  return result;
}