import { AIRequestBody, AIProvider, RoleType } from "../../layers/providers/types";
import { isValidType } from "../../layers/utils/typeGuard";
import { iClaimsRepository } from "./claims.repository";
import { CLAIM_OBJECT, INFLUENCER_CLAIMS_OBJECT } from "./constants";
import { InfluencerClaims } from "./types";

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
          role: RoleType.System,
          content: `
            You are a scientific journal, in charge of discovering and validating claims made by health influencers across social media.
            Be precise and complete.
            Only output structured JSON data with the requested fields.
          `
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
            Please group the claims of each influencer in an array of JSON objects.
            Each object should have the following properties: ${Object.keys(INFLUENCER_CLAIMS_OBJECT).join(", ")}
            Make sure to include claims for EVERY influencer.
          `
        },
      ],
    }

    const response = await this.aiProvider.getStructuredResponse<InfluencerClaims[]>(requestBody);

    if (response) {
      if (!isValidType<InfluencerClaims>(['influencerName', 'claims'], response[0])) {
        throw new Error(`Invalid InfluencerClaims object, received: ${JSON.stringify(response)}`);
      }

      const influencerClaims = await this.claimsRepository.saveClaimsForInfluencers(response);

      return influencerClaims;
    }

    return [];
  }
}