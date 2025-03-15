import { InfluencerModel } from "models/influencer";
import { MongoDALRepository } from "repository/data-access/mongo";
import { DALRepository } from "repository/types";
import { Claim, ClaimVerification, VerifiedClaim } from "types/claim";
import { ClaimDAO } from "types/claimDAO";
import { Influencer } from "types/influencer";
import { InfluencerDAO } from "types/influencerDAO";

export interface iInfluencerRepository {
  getInfluencers(): Promise<Influencer[]>;
}

export class InfluencerRepositoryMongo extends MongoDALRepository<InfluencerDAO> {
  constructor() {
    super(InfluencerModel);
  }
}

export class InfluencersRepository implements iInfluencerRepository {
  constructor(private readonly dalRepository: DALRepository<InfluencerDAO>) {}

  async getInfluencers(): Promise<Influencer[]> {
    const foundInfluencers = await this.dalRepository.find();

    return foundInfluencers.map((item) => this.mapInfluencerFromDAO(item));
  }

  private mapClaimFromDAO({ id, quote, title, category, date, source, verification }: ClaimDAO): VerifiedClaim {
    return {
      claim: {
        id,
        quote,
        title,
        category,
        date,
        source,
      },
      verification,
    }
  }

  private mapInfluencerFromDAO({ id, name, bio, rank, instagramUser, twitterUser, claims }: InfluencerDAO): Influencer {
    return {
      id,
      name,
      bio,
      rank,
      instagramUser,
      twitterUser,
      claims: claims?.map((item) => this.mapClaimFromDAO(item)) ?? [],
    }
  }
}