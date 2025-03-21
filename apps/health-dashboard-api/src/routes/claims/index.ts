import { FastifyPluginAsync } from "fastify";
import { ReplyClaims } from "./types.js";
import { ClaimsController, iClaimsController } from "./claims.controller.js";
import { ClaimV2, FiltersQuery, InfluencerRepositoryMongo } from "@core/health-dashboard";
import { ClaimsService } from "./claims.service.js";
import { ClaimsRepository } from "./claims.repository.js";

class ClaimsHandler {
  constructor(
    private claimsController: iClaimsController,
  ) {}

  public async getClaims(query: string): Promise<ClaimV2[]> {
    return await this.claimsController.getClaims(query);
  } 
}

class ClaimsHandlerProvider {
  private readonly dalRepository = new InfluencerRepositoryMongo();
  private readonly repository: ClaimsRepository = new ClaimsRepository(this.dalRepository);
  private readonly service: ClaimsService = new ClaimsService(this.repository);
  private readonly controller: ClaimsController = new ClaimsController(this.service);
  private readonly _handler: ClaimsHandler = new ClaimsHandler(this.controller);

  public get handler() {
    return this._handler;
  }
}

const claims: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get<{ Reply: ReplyClaims, Querystring: FiltersQuery }>('/', async (request, response) => {
    try {
      const handler = new ClaimsHandlerProvider().handler;
      const claims = await handler.getClaims(request?.query?.filters ?? '');

      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

      await delay(1500);

      response.code(200).send({
        claims
     });
    } catch (e) {
      response.code(500).send({
        message: `Error fetching claims - ${e}`,
      });
    }
  });
}

export default claims;