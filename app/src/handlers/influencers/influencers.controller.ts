import { DEFAULT_TOP_N_INFLUENCERS } from "./constants";
import { iInfluencersService } from "./influencers.service";
import { Influencer } from "./types";

export interface iInfluencersController {
  getInfluencers(topN?: number): Promise<Influencer[]>;
}

export class InfluencersController implements iInfluencersController {
  constructor(private readonly service: iInfluencersService) {}

  async getInfluencers(topN: number = DEFAULT_TOP_N_INFLUENCERS) {
    const influencers = await this.service.discoverInfluencers(topN);
    
    return influencers;
  }
}