import { MongoDALRepository } from "../../layers/repository/data-access/mongo.repository"
import { DALRepository } from "../../layers/repository/types";
import { INACTIVE_INFLUENCER_RANK } from "./constants";
import { InfluencerModel } from "./influencers.model"
import { Influencer, InfluencerDAO } from "./types"

export interface iInfluencerRepository {
  getInfluencers(): Promise<Influencer[]>;
  saveInfluencers(influencers: Influencer[]): Promise<Influencer[]>;
}

export class InfluencerRepositoryMongo extends MongoDALRepository<InfluencerDAO> {
  constructor() {
    super(InfluencerModel);
  };
}

export class InfluencersRepository implements iInfluencerRepository {
  constructor(private readonly dalRepository: DALRepository<InfluencerDAO>) {}

  async getInfluencers(): Promise<Influencer[]> {
    const foundInfluencers = await this.dalRepository.find();

    return this.mapInfluencersFromDAO(foundInfluencers);
  }

  async saveInfluencers(influencers: Influencer[]): Promise<Influencer[]> {
    const currentInfluencers = await this.dalRepository.find();
    const updatedInfluencers = this.updateInfluencersRanking(currentInfluencers, influencers);

    const result = await this.dalRepository.updateMany(updatedInfluencers, [], true);

    return result ? this.mapInfluencersFromDAO(updatedInfluencers) : [];
  }
   
  private mapInfluencersFromDAO(influencersDAO: InfluencerDAO[]): Influencer[] {
    return influencersDAO.map(({ name, rank, instagramUser, twitterUser }) => ({
      name,
      rank,
      instagramUser,
      twitterUser
    }));
  }

  private mapInfluencersToDAO(influencers: Influencer[]): InfluencerDAO[] {
    return influencers.map(({ name, rank, instagramUser, twitterUser }) => ({
      id: name,
      name,
      rank,
      instagramUser,
      twitterUser
    }));
  }

  private updateInfluencersRanking(currentInfluencers: InfluencerDAO[], newInfluencers: Influencer[]): InfluencerDAO[] {
    const updatedCurrentInfluencers: InfluencerDAO[] = currentInfluencers.map(currentItem => {
      const foundInfluencer = newInfluencers.find(newItem => newItem.name === currentItem.id);

      return {
        ...currentItem,
        rank: foundInfluencer ? foundInfluencer.rank : INACTIVE_INFLUENCER_RANK
      }
    });

    const filteredNewInfluencers: InfluencerDAO[] = this.mapInfluencersToDAO(newInfluencers.filter(newItem => !updatedCurrentInfluencers.find(currentItem => currentItem.id === newItem.name)));

    return [
      ...updatedCurrentInfluencers,
      ...filteredNewInfluencers
    ];
  }
}