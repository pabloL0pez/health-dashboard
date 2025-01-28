import { AIService } from "../../layers/services/ai.service";
import { AIRequestBody, LLMType, RoleType } from "../../layers/services/types";
import { INFLUENCER_OBJECT } from "./constants";
import { InfluencerRepository } from "./influencers.repository";
import { InfluencersResponse } from "./types";

export class InfluencersService {
  constructor(private readonly aiService: AIService, private readonly influencerRepository: InfluencerRepository) {}
  
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
      this.influencerRepository.saveInfluencers(response.influencers);
    }
    
    return response;
  }
}