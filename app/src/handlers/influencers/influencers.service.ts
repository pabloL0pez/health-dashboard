import { AIRequestBody, AIProvider, AIRoleType } from "../../layers/providers/types";
import { isValidType } from "../../layers/utils/typeGuard";
import { INFLUENCER_OBJECT } from "./constants";
import { iInfluencerRepository } from "./influencers.repository";
import { Influencer } from "./types";

export interface iInfluencersService {
  discoverInfluencers(topN: number): Promise<string[]>;
}

export class InfluencersService implements iInfluencersService {
  constructor(
    private readonly aiProvider: AIProvider,
    private readonly influencerRepository: iInfluencerRepository
  ) {}
  
  async discoverInfluencers(topN: number) {
    const requestBody: AIRequestBody = {
      messages: [
        {
          role: 'system',
          content: `
            Your job is to discover the top health influencers on social media.
            Be precise and concise.
            Only output structured JSON data with the requested fields.
          `
        },
        {
          role: 'user',
          content: `
            Please perform a discovery of the top ${topN} health influencers on social media. 
            Please output an array of JSON objects for each influencer.
            Each JSON object should contain the following fields: 
            ${Object.keys(INFLUENCER_OBJECT).join(", ")}
            Make sure to include a base64 encoded image for each influencer.
          `
        },
      ],
      temperature: 0,
    }

    const { response, provider, model } = await this.aiProvider.getStructuredResponse<Influencer[]>(requestBody);

    if (response) {
      if (!isValidType<Influencer>(['name', 'rank'], response[0])) {
        throw new Error(`Invalid Influencer object, received: ${JSON.stringify(response)}`);
      }

      const influencers = await this.influencerRepository.saveInfluencers(response, { provider, model });

      return influencers
        .filter(item => item.rank > 0)
        .sort((a, b) => b.rank - a.rank)
        .map(item => item.name);
    }

    return [];
  }
}