import { Claim, ClaimDAO } from "@core/health-dashboard";
import { DALRepository, DBReadQuery } from "../../layers/repository/types";
import { InfluencerDAO } from "../influencers/types";
import { formatInfluencerNameToId } from "../influencers/utils";
import { AIProviderModel } from "../types";
import { InfluencerClaims } from "./types";
import { v4 as uuidv4 } from 'uuid';

export interface iClaimsRepository {
  findClaimsByInfluencer: (influencerName: string) => Promise<Claim[]>
  saveClaimsForInfluencers: (influencerClaims: InfluencerClaims[], aiProviderModel: AIProviderModel) => Promise<InfluencerClaims[]>;
}

export class ClaimsRepository implements iClaimsRepository {
  constructor(private readonly dalRepository: DALRepository<InfluencerDAO>) {}

  public async findClaimsByInfluencer(influencerName: string): Promise<Claim[]> {
    const influencerQuery: DBReadQuery<InfluencerDAO> = {
      field: 'name',
      operator: 'eq', 
      value: influencerName,
    }

    const foundInfluencer = await this.dalRepository.findOne(influencerQuery);

    if (foundInfluencer?.claims) {
      return this.mapClaimsFromDAO(foundInfluencer?.claims);
    }

    return [];
  }

  public async saveClaimsForInfluencers(influencerClaims: InfluencerClaims[], aiProviderModel: AIProviderModel): Promise<InfluencerClaims[]> {
    const activeInfluencersQuery: DBReadQuery<InfluencerDAO> = {
      field: 'id',
      operator: 'in',
      value: influencerClaims.map(({ influencerName }) => formatInfluencerNameToId(influencerName)),
    }
    const currentInfluencers = await this.dalRepository.find(undefined, activeInfluencersQuery);
    const updatedInfluencerClaims = this.updateInfluencerClaims(currentInfluencers, influencerClaims, aiProviderModel);

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
    return claims.map(({ id, quote, title, category, date, source }) => ({
      id,
      quote,
      title,
      category,
      date,
      source,
    }));
  }

  private updateInfluencerClaims(currentInfluencers: InfluencerDAO[], influencerClaims: InfluencerClaims[], aiProviderModel: AIProviderModel): InfluencerDAO[] {
    return currentInfluencers.map(currentInfluencer => ({
      ...currentInfluencer,
      ai: {
        ...currentInfluencer.ai,
        claims: aiProviderModel,
      },
      claims: influencerClaims.find(influencer => influencer.influencerName === currentInfluencer.name)?.claims.map(item => ({
        ...item,
        id: uuidv4(),
      })) ?? [],
    }));
  }
}