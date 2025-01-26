import { AIService } from "../../layers/services/ai.service";
import { AIRequestBody, LLMType, RoleType } from "../../layers/services/types";
import { DEFAULT_TOP_N_INFLUENCERS, INFLUENCER_OBJECT } from "./constants";
import { InfluencersResponse } from "./types";

export class InfluencersModel {
  constructor(private readonly aiService: AIService) {}

  async getInfluencers(topN: number = DEFAULT_TOP_N_INFLUENCERS) {
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
      // TODO: Research how to work with structured response format on JavaScript (not working with current config)
      // response_format: {
      //     type: FormatType.JsonSchema,
      //     json_schema: {schema: InfluencersResponseSchema},
      // },
    }

    const response = await this.aiService.getStructuredResponse<InfluencersResponse>(requestBody);
    
    return response;
  }
}