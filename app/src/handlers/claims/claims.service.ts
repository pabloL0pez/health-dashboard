import { AIRequestBody, AIService, LLMType, RoleType } from "../../layers/services/types";
import { iClaimsRepository } from "./claims.repository";
import { CLAIM_OBJECT, CLAIMS_RESPONSE_OBJECT, INFLUENCER_CLAIMS_OBJECT } from "./constants";
import { ClaimsResponse, InfluencerClaims } from "./types";

export interface iClaimsService {
  identifyHealthClaims: (influencers: string[], maxClaims: number) => Promise<InfluencerClaims[]>
}

export class ClaimsService implements iClaimsService {
  constructor(private readonly aiService: AIService, private readonly claimsRepository: iClaimsRepository) {}

  public async identifyHealthClaims (influencers: string[], maxClaims: number): Promise<InfluencerClaims[]> {
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
            Please group the claims of each influencer in an array of JSON objects with the following property key: ${Object.keys(CLAIMS_RESPONSE_OBJECT).join("")}
            Each object should have the following properties: ${Object.keys(INFLUENCER_CLAIMS_OBJECT).join(", ")}
          `
        },
      ],
    }

    const response = await this.aiService.getStructuredResponse<ClaimsResponse>(requestBody);

    if (response) {
      const influencerClaims = await this.claimsRepository.saveClaimsForInfluencers(response.claimsByInfluencer);

      return influencerClaims;
    }

    return [];
  }
}