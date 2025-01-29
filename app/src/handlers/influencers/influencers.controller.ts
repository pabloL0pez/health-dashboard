import { DEFAULT_TOP_N_INFLUENCERS } from "./constants";
import { iInfluencersService } from "./influencers.service";

export interface iInfluencersController {
  getInfluencers(topN?: number): Promise<string[]>;
}

export class InfluencersController implements iInfluencersController {
  constructor(private readonly service: iInfluencersService) {}

  async getInfluencers(topN: number = DEFAULT_TOP_N_INFLUENCERS) {
    return await this.service.discoverInfluencers(topN);
  }
}