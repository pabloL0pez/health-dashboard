import { PerplexityService } from "../../layers/services/perplexity/perplexity.service";
import { DEFAULT_TOP_N_INFLUENCERS } from "./constants";
import { InfluencerRepositoryMongo, InfluencersRepository } from "./influencers.repository";
import { InfluencersService } from "./influencers.service";

export class InfluencersController {
  private readonly dalRepository = new InfluencerRepositoryMongo();
  private readonly repository: InfluencersRepository = new InfluencersRepository(this.dalRepository);
  private readonly service: InfluencersService = new InfluencersService(PerplexityService.instance, this.repository)

  async getInfluencers(topN: number = DEFAULT_TOP_N_INFLUENCERS) {
    const influencers = await this.service.discoverInfluencers(topN);
    
    return influencers;
  }
}