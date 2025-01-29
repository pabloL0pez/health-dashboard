import { DALRepository, DBQuery } from "../../layers/repository/types";
import { InfluencerDAO } from "../influencers/types";
import { Claim, ClaimDAO, InfluencerClaims } from "./types";

export interface iClaimsRepository {
  saveClaimsForInfluencers: (influencerClaims: InfluencerClaims[]) => Promise<InfluencerClaims[]>;
}

export class ClaimsRepository implements iClaimsRepository {
  constructor(private readonly dalRepository: DALRepository<InfluencerDAO>) {}

  public async saveClaimsForInfluencers(influencerClaims: InfluencerClaims[]): Promise<InfluencerClaims[]> {
    const activeInfluencersQuery: DBQuery<InfluencerDAO> = {
      field: 'rank',
      operator: 'gte',
      value: 1,
    }
    const currentInfluencers = await this.dalRepository.find(undefined, activeInfluencersQuery);
    const updatedInfluencerClaims = this.updateInfluencerClaims(currentInfluencers, influencerClaims);

    const result = await this.dalRepository.updateMany(updatedInfluencerClaims, [], true);

    return result ? this.mapInfluencerClaimsFromDAO(updatedInfluencerClaims) : []
  }

  private mapInfluencerClaimsFromDAO(influencers: InfluencerDAO[]): InfluencerClaims[] {
    return influencers.map(({ name, claims }) => ({
      influencerName: name,
      claims: claims ? this.mapClaimsFromDAO(claims) : [],
    }));
  }

  private mapClaimsFromDAO(claims: ClaimDAO[]): Claim[] {
    return claims.map(({ quote, title, category, score, status }) => ({
      quote,
      title,
      category,
      score,
      status,
    }));
  }

  private updateInfluencerClaims(currentInfluencers: InfluencerDAO[], influencerClaims: InfluencerClaims[]): InfluencerDAO[] {
    return currentInfluencers.map(currentInfluencer => ({
      ...currentInfluencer,
      claims: influencerClaims.find(influencer => influencer.influencerName === currentInfluencer.name)?.claims ?? [],
    }));
  }
}