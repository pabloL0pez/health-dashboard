import { MongoDALRepository } from "../../layers/repository/data-access/mongo.repository"
import { DALRepository } from "../../layers/repository/repository";
import { InfluencerDAO, InfluencerModel } from "./influencers.model"
import { Influencer } from "./types"

export interface InfluencerRepository {
  getInfluencers(): Promise<Influencer[]>;
  saveInfluencers(influencers: Influencer[]): Promise<Influencer[]>;
}

export class InfluencerRepositoryMongo extends MongoDALRepository<InfluencerDAO> {
  constructor() {
    super(InfluencerModel);
  };
}

export class InfluencersRepository implements InfluencerRepository {
  constructor(private readonly dalRepository: DALRepository<InfluencerDAO>) {}

  async getInfluencers(): Promise<Influencer[]> {
    const foundInfluencers = await this.dalRepository.findAll();
    return this.mapInfluencers(foundInfluencers);
  }

  async saveInfluencers(influencers: Influencer[]): Promise<Influencer[]> {
    const savedInfluencers = await this.dalRepository.insertMany(influencers);
    return this.mapInfluencers(savedInfluencers);
  }

  private mapInfluencers(influencersDAO: InfluencerDAO[]): Influencer[] {
    return influencersDAO.map(({ name, rank, instagramUser, twitterUser }) => ({
      name,
      rank,
      instagramUser,
      twitterUser
    }));
  }
}