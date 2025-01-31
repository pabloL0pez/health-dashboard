import { AIRequestBody, AIService, LLMType, RoleType } from "../../layers/services/types";
import { isValidType } from "../../layers/utils/typeGuard";
import { INFLUENCER_OBJECT } from "./constants";
import { iInfluencerRepository } from "./influencers.repository";
import { Influencer } from "./types";

export interface iInfluencersService {
  discoverInfluencers(topN: number): Promise<string[]>;
}

export class InfluencersService implements iInfluencersService {
  constructor(private readonly aiService: AIService, private readonly influencerRepository: iInfluencerRepository) {}
  
  async discoverInfluencers(topN: number) {
    const requestBody: AIRequestBody = {
      model: LLMType.Sonar,
      messages: [
        {
          role: RoleType.System,
          content: `
            Your job is to discover the top health influencers on social media.
            Be precise and concise.
            Only output structured JSON data with the requested fields.
          `
        },
        {
          role: RoleType.User,
          content: `
            Please perform a discovery of the top ${topN} health influencers on social media. 
            Please output an array of JSON objects for each influencer.
            Each JSON object should contain the following fields: 
            ${Object.keys(INFLUENCER_OBJECT).join(", ")}
          `
        },
      ],
    }

    const response = await this.aiService.getStructuredResponse<Influencer[]>(requestBody);

    if (response) {
      if (!isValidType<Influencer>(['name', 'rank'], response[0])) {
        throw new Error(`Invalid Influencer object, received: ${JSON.stringify(response)}`);
      }

      const influencers = await this.influencerRepository.saveInfluencers(response);

      return influencers
        .filter(item => item.rank > 0)
        .sort((a, b) => b.rank - a.rank)
        .map(item => item.name);
    }

    return [];
  }
}