import { AIRequestBody, AIProvider } from "../../layers/providers/types";
import { isValidType } from "../../layers/utils/typeGuard";
import { claimsAISchema } from "./claims.ai-schema";
import { iClaimsRepository } from "./claims.repository";
import { CLAIM_OBJECT, CLAIMS_RESPONSE_OBJECT, INFLUENCER_CLAIMS_OBJECT } from "./constants";
import { ClaimsResponse, InfluencerClaims } from "./types";

export interface iClaimsService {
  identifyHealthClaims: (influencers: string[], maxClaims: number) => Promise<InfluencerClaims[]>
}

export class ClaimsService implements iClaimsService {
  constructor(
    private readonly aiProvider: AIProvider,
    private readonly claimsRepository: iClaimsRepository
  ) {}

  public async identifyHealthClaims (influencers: string[], maxClaims: number): Promise<InfluencerClaims[]> {
    const requestBody: AIRequestBody = {
      messages: [
        {
          role: 'system',
          content: `
            You are a scientific journal, in charge of discovering and validating claims made by health influencers across social media.
            Be precise and complete.
            Only output structured JSON data with the requested fields.
          `
        },
        {
          role: 'user',
          content: `
            Please perform a discovery of the most recent health claims done by the following influencers: ${influencers.join(", ")}.
            Find, at most, ${maxClaims} claims per influencer.
            Assign a category to each claim, such as 'nutrition', 'exercise', 'mental health', etc.
            Each claim object should have the following fields: ${Object.keys(CLAIM_OBJECT).join(", ")}
            Make sure to quote the influencer's claims and create a title for each claim, summarizing it in just a few words.
            The quote can be as descriptive as needed, no limit on character count.
            Calculate a trust score from 0 to 100 for each claim, based on how reliable the source is.
            Based on the score, categorize each claim as either 'confirmed', 'questionable', or 'debunked'.
            Please group the claims of each influencer in an array of JSON objects, under the following key: ${Object.keys(CLAIMS_RESPONSE_OBJECT).join("")}.
            Each object should have the following properties: ${Object.keys(INFLUENCER_CLAIMS_OBJECT).join(", ")}
            Make sure to include claims for EVERY influencer.
          `
        },
      ],
      temperature: 0.9,
    }

    const { response, ...aiProviderModel } = await this.aiProvider.getStructuredResponse<ClaimsResponse>(requestBody, claimsAISchema);
    const claimsResponse = response?.claimsByInfluencer;

    console.log(response);

    if (claimsResponse) {
      if (!isValidType<InfluencerClaims>(['influencerName', 'claims'], claimsResponse[0])) {
        throw new Error(`Invalid InfluencerClaims object, received: ${JSON.stringify(response)}`);
      }

      const influencerClaims = await this.claimsRepository.saveClaimsForInfluencers(claimsResponse, aiProviderModel);

      return influencerClaims;
    }

    return [];
  }
}