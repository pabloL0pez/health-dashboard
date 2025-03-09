import { Influencer } from "@core/health-dashboard";
import { MongoDALRepository } from "../../layers/repository/data-access/mongo.repository"
import { DALRepository, DBReadQuery } from "../../layers/repository/types";
import { base64toBuffer } from "../../layers/utils/encoding";
import { AIProviderHandler, AIProviderModel } from "../types";
import { INACTIVE_INFLUENCER_RANK } from "./constants";
import { InfluencerModel } from "./influencers.model"
import { InfluencerDAO } from "./types"
import { formatInfluencerNameToId } from "./utils";

export interface iInfluencerRepository {
  getInfluencer(influencerName: string): Promise<Influencer | null>;
  getInfluencers(): Promise<Influencer[]>;
  saveInfluencers(influencers: Influencer[], aiProviderModel?: AIProviderModel): Promise<Influencer[]>;
}

export class InfluencerRepositoryMongo extends MongoDALRepository<InfluencerDAO> {
  constructor() {
    super(InfluencerModel);
  };
}

export class InfluencersRepository implements iInfluencerRepository {
  constructor(private readonly dalRepository: DALRepository<InfluencerDAO>) {}

  async getInfluencer(influencerName: string): Promise<Influencer | null> {
     const influencerQuery: DBReadQuery<InfluencerDAO> = {
          field: 'name',
          operator: 'eq', 
          value: influencerName,
        }
    
    const foundInfluencer = await this.dalRepository.findOne(influencerQuery);

    if (foundInfluencer) {
      return this.mapInfluencerFromDAO(foundInfluencer);
    }

    return null;
  }

  async getInfluencers(): Promise<Influencer[]> {
    const foundInfluencers = await this.dalRepository.find();

    return this.mapInfluencersFromDAO(foundInfluencers);
  }

  async saveInfluencers(influencers: Influencer[], aiProviderModel?: AIProviderModel): Promise<Influencer[]> {
    const currentInfluencers = await this.dalRepository.find();
    const updatedInfluencers: InfluencerDAO[] = this.updateInfluencersRanking(currentInfluencers, influencers)
      .map(item => {
        const ai: AIProviderHandler = {
          influencers: aiProviderModel,
        }

        return {
          ...item,
          ai,
        }
      });

    const result = await this.dalRepository.updateMany(updatedInfluencers, [], true);

    return result ? this.mapInfluencersFromDAO(updatedInfluencers) : [];
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

  private mapInfluencersToDAO(influencers: Influencer[]): InfluencerDAO[] {
    return influencers.map(({ name, bio, rank, instagramUser, twitterUser, image }) => {
      return {
        id: formatInfluencerNameToId(name),
        name,
        bio,
        rank,
        instagramUser,
        twitterUser,
        image: image ? base64toBuffer(image) : Buffer.alloc(0),
      }
    });
  }

  private updateInfluencersRanking(currentInfluencers: InfluencerDAO[], newInfluencers: Influencer[]): InfluencerDAO[] {
    const updatedCurrentInfluencers: InfluencerDAO[] = currentInfluencers.map(currentItem => {
      const foundInfluencer = newInfluencers.find(newItem => formatInfluencerNameToId(newItem.name) === currentItem.id);

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