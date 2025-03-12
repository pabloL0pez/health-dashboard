import { FilterConfig, InfluencerRepositoryMongo, InfluencersRepository } from "@core/health-dashboard";
import { FastifyPluginAsync } from "fastify";
import { FiltersController, iFiltersController } from "./filters.controller.js";
import { ReplyFilters } from "./types.js";
import { FiltersService } from "./filters.service.js";

class FiltersHandler {
  constructor(
    private filtersController: iFiltersController,
  ) {}

  public async getFilters(): Promise<FilterConfig[]> {
    return this.filtersController.getFilters();
  } 
}

class FiltersHandlerProvider {
  private readonly dalRepository = new InfluencerRepositoryMongo();
  private readonly repository: InfluencersRepository = new InfluencersRepository(this.dalRepository);
  private readonly service: FiltersService = new FiltersService(this.repository);
  private readonly controller: FiltersController = new FiltersController(this.service);
  private readonly _handler: FiltersHandler = new FiltersHandler(this.controller);

  public get handler() {
    return this._handler;
  }
}

const filters: FastifyPluginAsync = async (fastify): Promise<void> => {
  const handler = new FiltersHandlerProvider().handler;

  fastify.get<{ Reply: ReplyFilters }>('/', async (_request, response) => {
    try {
      const result = await handler.getFilters();

      response.code(200).send({
         filters: result,
      });
    } catch (e) {
      response.code(500).send({
        message: `Error fetching filters - ${e}`,
      });
    }
  });
};

export default filters;