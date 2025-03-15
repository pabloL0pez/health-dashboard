import { capitalize, ClaimCategoryType, FilterBase, FilterCategory, FilterConfig, FilterOption, iInfluencerRepository, Influencer, VerifiedClaim } from "@core/health-dashboard";
import { CATEGORY_FILTER_LABEL, DATE_FILTER_LABEL, INFLUENCER_FILTER_LABEL } from "./constants.js";

export interface iFiltersService {
  fetchFilters: () => Promise<FilterConfig[]>
}

export class FiltersService implements iFiltersService {
  constructor(
    private readonly influencerRespository: iInfluencerRepository
  ) {}

  public async fetchFilters() {
    const influencers = await this.influencerRespository.getInfluencers();

    return this.buildFilters(influencers);
  }

  private buildFilters(influencers: Influencer[]): FilterConfig[] {
    return [
      this.getInfluencerFilter(influencers),
      this.getCategoryFilter(influencers),
      this.getDateFilter(influencers),
    ].filter(item => item?.options?.length);
  }

  private getInfluencerFilter(influencers: Influencer[]): FilterBase {
    return {
      id: 'influencer',
      label: INFLUENCER_FILTER_LABEL,
      options: influencers.map(({ id, name }) => ({
        value: id,
        label: name,
        isSelected: false,
      })),
    }
  }

  private getCategoryFilter(influencers: Influencer[]): FilterCategory {
    return {
      id: 'category',
      label: CATEGORY_FILTER_LABEL,
      options: influencers
        .reduce((acum: VerifiedClaim[], item) => {
          return [...acum, ...item.claims];
        }, [])
        .reduce((acum: FilterOption<ClaimCategoryType>[], { claim }) => {
          if (!acum.filter((item: FilterOption<ClaimCategoryType>) => item.value === claim.category).length) {
            return [
              ...acum,
              {
                value: claim.category,
                label: capitalize(claim.category),
                isSelected: false,
              }
            ]
          }

          return acum;
        }, [])
    }
  }

  private getDateFilter(influencers: Influencer[]): FilterBase {
    return {
      id: 'date',
      label: DATE_FILTER_LABEL,
      options: [],
    }
  }
}