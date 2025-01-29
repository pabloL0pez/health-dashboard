import { MongoClient } from "../../layers/config/mongo/mongo";
import { PerplexityService } from "../../layers/services/perplexity/perplexity.service";
import { isValidType } from "../../layers/utils/typeGuard";
import { InfluencerRepositoryMongo } from "../influencers/influencers.repository";
import { HandlerResult } from "../types";
import { buildHandlerError } from "../utils";
import { ClaimsController } from "./claims.controller";
import { ClaimsRepository } from "./claims.repository";
import { ClaimsService } from "./claims.service";
import { ClaimsEvent } from "./types";

class ClaimsHandler {
  constructor(private readonly claimsController: ClaimsController) {}

  async handleEvent(event: ClaimsEvent): HandlerResult {
    const claims = await this.claimsController.getClaims(event?.influencers);

    return {
      statusCode: 200,
      statusDescription: `Updated database with claims: `,
      body: JSON.stringify(claims),
    };
  }
}

class ClaimsHandlerProvider {
  private static readonly dalRepository = new InfluencerRepositoryMongo();
  private static readonly repository: ClaimsRepository = new ClaimsRepository(this.dalRepository);
  private static readonly service: ClaimsService = new ClaimsService(PerplexityService.instance, this.repository);
  private static readonly controller: ClaimsController = new ClaimsController(this.service);
  private static readonly handler = new ClaimsHandler(this.controller);

  static inject() {
    return this.handler;
  }
}

export const handler = async (event: ClaimsEvent): HandlerResult => {
  if (!isValidType<ClaimsEvent>(['influencers'], event)) {
    return {
      statusCode: 400,
      body: buildHandlerError(event),
    }
  }

  await MongoClient.instance.connect();

  const claimsHandler = ClaimsHandlerProvider.inject();
  const result = await claimsHandler.handleEvent(event);

  return result;
}