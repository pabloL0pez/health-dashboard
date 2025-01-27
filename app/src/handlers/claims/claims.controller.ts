import { AIService } from "../../layers/services/ai.service";
import { AIRequestBody, LLMType, RoleType } from "../../layers/services/types";
import { CLAIM_OBJECT, DEFAULT_MAX_CLAIMS } from "./constants";
import { ClaimsResponse } from "./types";

export class ClaimsController {
  constructor(private readonly aiService: AIService) {}

  async getClaims(influencers: string[], maxClaims: number = DEFAULT_MAX_CLAIMS): Promise<any> {
    const requestBody: AIRequestBody = {
      model: LLMType.Sonar,
      messages: [
        {
          role: RoleType.System,
          content: "Be precise and complete. Only output structured JSON data with the requested fields."
        },
        {
          role: RoleType.User,
          content: `
            Please perform a discovery of the most recent health claims done by the following influencers: ${influencers.join(", ")}.
            Find, at most, ${maxClaims} claims per influencer.
            Assign a category to each claim, such as 'nutrition', 'exercise', 'mental health', etc.
            Each claim object should have the following fields: ${Object.keys(CLAIM_OBJECT).join(", ")}
            Make sure to quote the influencer's claims and create a title for each claim, summarizing it in just a few words.
            Calculate a trust score from 0 to 100 for each claim, based on how reliable the source is.
            Based on the score, categorize each claim as either 'confirmed', 'questionable', or 'debunked'.
            Please output a JSON object with the 'claimsByInfluencer' key containing an array of objects, with an 'influencer' property and a 'claims' property
            The 'claims' property should be an array of claims for the corresponding influencer. 
          `
        },
      ],
    }

    const response = await this.aiService.getStructuredResponse<ClaimsResponse>(requestBody);

    return response;
  }
}