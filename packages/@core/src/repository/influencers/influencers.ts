import { InfluencerModel } from "models/influencer";
import { MongoDALRepository } from "repository/data-access/mongo";
import { DALRepository } from "repository/types";
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

    return this.mapInfluencersFromDAO(foundInfluencers);
  }

  private mapInfluencersFromDAO(influencersDAO: InfluencerDAO[]): Influencer[] {
    return influencersDAO.map(this.mapInfluencerFromDAO);
  }

  private mapInfluencerFromDAO({ name, bio, rank, instagramUser, twitterUser }: InfluencerDAO): Influencer {
    return {
      name,
      bio,
      rank,
      instagramUser,
      twitterUser
    }
  }
}