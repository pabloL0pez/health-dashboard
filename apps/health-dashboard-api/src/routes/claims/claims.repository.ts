import { Claim, ClaimDAO, DALRepository, InfluencerDAO, MapFiltersSelection } from "@core/health-dashboard";
import { FilterQuery, Model, PipelineStage } from "mongoose";
import { VerifiedClaimWithInfluencer } from "./types.js";

export interface iClaimsRepository {
  findClaims: (filters: MapFiltersSelection) => Promise<VerifiedClaimWithInfluencer[]>;
}

const DEFAULT_AGGREGATE: PipelineStage[] = [{
  "$match": {},
}];

export class ClaimsRepository implements iClaimsRepository {
  constructor(private readonly dalRepository: DALRepository<InfluencerDAO>) {}

  public async findClaims(filters: MapFiltersSelection): Promise<VerifiedClaimWithInfluencer[]> {
    const result = await this.dalRepository.query<Model<InfluencerDAO>>(async (model) => {
      const aggregate = this.getAggregationFromFilters(filters);
      const response = await model?.aggregate<InfluencerDAO>(aggregate.length ? aggregate : DEFAULT_AGGREGATE);

      if (!response) {
        return [];
      }

      return response;
    });

    return this.reduceInfluencersToVerifiedClaims(result);
  }

  private getAggregationFromFilters(filters: MapFiltersSelection): PipelineStage[] {
    const stages: PipelineStage[] = [];

    if (!filters) {
      return stages;
    }

    if (filters?.influencer?.length) {
      stages.push({
        "$match": {
          "id": {
            "$in": filters?.influencer,
          }
        }
      });
    }

    const categoryAndStatusFilter: FilterQuery<unknown>[] = [];

    if (filters?.category?.length) {
      categoryAndStatusFilter.push({"$in": ["$$claim.category", filters?.category]});
    }

    if (filters?.status?.length) {
      categoryAndStatusFilter.push({"$in": ["$$claim.verification.status.value", filters?.status]});
    }

    if (categoryAndStatusFilter.length) {
      stages.push({
        "$set": {
          "claims": {
            "$filter": {
              "input": "$claims",
              "as": "claim",
              "cond": { 
                "$and": categoryAndStatusFilter,
              }
            }
          }
        }
      })
    }

    return stages;
  }

  private reduceInfluencersToVerifiedClaims(influencers: InfluencerDAO[]): VerifiedClaimWithInfluencer[] {
    return influencers
      .reduce((acum: VerifiedClaimWithInfluencer[], { name, claims }) => [
        ...acum,
        ...(claims?.map(item => ({
          influencerName: name,
          claim: this.mapClaimDAOToClaim(item),
          verification: item.verification,
        })) ?? []),
      ], [])
  }

  private mapClaimDAOToClaim({ id, quote, title, category, date, source }: ClaimDAO): Claim {
    return {
      id,
      quote,
      title,
      category,
      date,
      source,
    }
  }
}
