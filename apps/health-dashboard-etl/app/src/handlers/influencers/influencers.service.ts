import { Influencer } from "@core/health-dashboard";
import { promptsDictionary } from "../../layers/providers/constants";
import { AIRequestBody, AIProvider } from "../../layers/providers/types";
import { isValidType } from "../../layers/utils/typeGuard";
import { INFLUENCER_OBJECT, INFLUENCERS_RESPONSE_OBJECT, MOCK_IMAGE } from "./constants";
import { influencersAISchema } from "./influencers.ai-schema";
import { iInfluencerRepository } from "./influencers.repository";
import { InfluencersResponse } from "./types";

export interface iInfluencersService {
  discoverInfluencers(topN: number): Promise<string[]>;
}

export class InfluencersService implements iInfluencersService {
  constructor(
    private readonly aiProvider: AIProvider,
    private readonly influencerRepository: iInfluencerRepository
  ) {}
  
  async discoverInfluencers(topN: number) {
    const { system: { preciseAndComplete, structuredJSONData, noComments } } = promptsDictionary;
    const requestBody: AIRequestBody = {
      messages: [
        {
          role: 'system',
          content: `
            Your job is to discover the top health influencers on social media.
            ${preciseAndComplete}
            ${structuredJSONData}
            ${noComments}
          `
        },
        {
          role: 'user',
          content: `
            Please perform a discovery of the top ${topN} health influencers on social media. 
            Please output an array of JSON objects for each influencer, under the following key: ${Object.keys(INFLUENCERS_RESPONSE_OBJECT).join("")}.
            Each JSON object should contain the following fields: 
            ${Object.keys(INFLUENCER_OBJECT).join(", ")}
            Include a brief biography for each influencer.
            Make sure to include a base64 encoded image for each influencer.
          `
        },
      ],
    }

    const { response, ...aiProviderModel } = await this.aiProvider.getStructuredResponse<InfluencersResponse>(requestBody, influencersAISchema);
    const influencersResponse = response?.influencers;

    if (influencersResponse) {
      if (!isValidType<Influencer>(['name', 'rank'], influencersResponse[0])) {
        throw new Error(`Invalid Influencer object, received: ${JSON.stringify(response)}`);
      }

      const influencers = await this.influencerRepository.saveInfluencers(influencersResponse.map(item => ({ ...item, image: MOCK_IMAGE })), aiProviderModel);

      return influencers
        .filter(item => item.rank > 0)
        .sort((a, b) => a.rank - b.rank)
        .map(item => item.name);
    }

    return await [];
  }
}