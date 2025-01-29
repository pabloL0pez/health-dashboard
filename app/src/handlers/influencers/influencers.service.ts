import { AIRequestBody, AIService, LLMType, RoleType } from "../../layers/services/types";
import { INFLUENCER_OBJECT } from "./constants";
import { iInfluencerRepository } from "./influencers.repository";
import { Influencer, InfluencersResponse } from "./types";

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
          content: "Be precise and concise. Only output structured JSON data with the requested fields."
        },
        {
          role: RoleType.User,
          content: `
            Please perform a discovery of the top ${topN} health influencers on social media. 
            Please output a JSON object with the 'influencers' key containing an array of influencers, with the following fields: 
            ${Object.keys(INFLUENCER_OBJECT).join(", ")}
          `
        },
      ],
    }

    const response = await this.aiService.getStructuredResponse<InfluencersResponse>(requestBody);

    if (response) {
      const influencers = await this.influencerRepository.saveInfluencers(response.influencers);

      return influencers
        .filter(item => item.rank > 0)
        .sort((a, b) => b.rank - a.rank)
        .map(item => item.name);
    }

    return [];
  }
}