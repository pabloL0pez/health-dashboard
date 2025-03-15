import { capitalize, FilterBase, FilterCategory, FilterConfig, FilterOption, FilterStatus, iInfluencerRepository, Influencer, VerifiedClaim } from "@core/health-dashboard";
import { CATEGORY_FILTER_LABEL, DATE_FILTER_LABEL, INFLUENCER_FILTER_LABEL, STATUS_FILTER_LABEL, STATUS_ORDER } from "./constants.js";

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
      this.getStatusFilter(influencers),
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
    const valueFn = (({ claim: { category } }: VerifiedClaim) => category);
    const options = this.reduceInfluencersToFilterOptions(influencers, valueFn);

    return {
      id: 'category',
      label: CATEGORY_FILTER_LABEL,
      options,
    }
  }

  private getDateFilter(influencers: Influencer[]): FilterBase {
    return {
      id: 'date',
      label: DATE_FILTER_LABEL,
      options: [],
    }
  }

  private getStatusFilter(influencers: Influencer[]): FilterStatus {
    const valueFn = (({ verification: { status: { value } } }: VerifiedClaim) => value);
    const options = this.reduceInfluencersToFilterOptions(influencers, valueFn)
      .sort((a, b) => STATUS_ORDER[a.value] - STATUS_ORDER[b.value]);

    return {
      id: 'status',
      label: STATUS_FILTER_LABEL,
      options,
    }
  }

  private reduceInfluencersToFilterOptions<T extends string>(influencers: Influencer[], valueFn: (claim: VerifiedClaim) => T): FilterOption<T>[] {
    return influencers
      .reduce((acum: VerifiedClaim[], item) => {
        return [...acum, ...item.claims];
      }, [])
      .reduce((acum: FilterOption<T>[], claim) => {
        if (!acum.filter((item: FilterOption<T>) => item.value === valueFn(claim)).length) {
          return [
            ...acum,
            {
              value: valueFn(claim),
              label: capitalize(valueFn(claim)),
              isSelected: false,
            }
          ]
        }

        return acum;
      }, [])
  }
}