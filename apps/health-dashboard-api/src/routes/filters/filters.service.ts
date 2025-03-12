import { FilterConfig, iInfluencerRepository } from "@core/health-dashboard";

export interface iFiltersService {
  fetchFilters: () => Promise<FilterConfig[]>
}

export class FiltersService implements iFiltersService {
  constructor(
    private readonly influencerRespository: iInfluencerRepository
  ) {}

  public async fetchFilters() {
    const influencers = await this.influencerRespository.getInfluencers();

    console.log(influencers);

    return Promise.resolve([]);
  }
}