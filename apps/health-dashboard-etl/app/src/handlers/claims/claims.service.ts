import { Claim } from "@core/health-dashboard";
import { promptsDictionary } from "../../layers/providers/constants";
import { AIRequestBody, AIProvider } from "../../layers/providers/types";
import { isValidType } from "../../layers/utils/typeGuard";
import { claimsAISchema } from "./claims.ai-schema";
import { iClaimsRepository } from "./claims.repository";
import { CLAIM_OBJECT, CLAIM_SOURCE_OBJECT, CLAIMS_RESPONSE_OBJECT } from "./constants";
import { ClaimsResponse, InfluencerClaims } from "./types";

export interface iClaimsService {
  identifyHealthClaims: (influencers: string[], maxClaims: number) => Promise<InfluencerClaims[]>
}

export class ClaimsService implements iClaimsService {
  constructor(
    private readonly aiProvider: AIProvider,
    private readonly claimsRepository: iClaimsRepository
  ) {}

  public async identifyHealthClaims(influencers: string[], maxClaims: number): Promise<InfluencerClaims[]> {
    const influencersClaims: InfluencerClaims[] = [];
    const { system: { preciseAndComplete, structuredJSONData, noComments } } = promptsDictionary;

    for (let influencerName of influencers) {
      const requestBody: AIRequestBody = {
        messages: [
          {
            role: 'system',
            content: `
              You are a scientific journal, in charge of discovering claims made by health influencers across social media.
              ${preciseAndComplete}
              ${structuredJSONData}
              ${noComments}
            `
          },
          {
            role: 'user',
            content: `
              Please perform a discovery of the most recent health claims done by the health influencer ${influencerName}.
              Aim for claims that are more on the factual side, rather than opinions or personal experiences.
              Avoid returning claims that have an emotional bias, just focus on objective health statements.
              Find, at most, ${maxClaims} claims.
              Assign a category to each claim, such as 'nutrition', 'exercise', 'mental health', etc.
              Each claim object should have the following fields: ${Object.keys(CLAIM_OBJECT).join(", ")}
              Make sure to quote the influencer's claims and create a title for each claim, summarizing it in just a few words.
              Only include what was literally stated by the influencer in the quote, don't add anything on top of his own words; but do make sure to return all quotes in English.
              Try to include the date in which the claim was made by the influencer, with the format "Month, Year".
              Also, try to include the source of the claim, like the podcast / post where it was first mentioned, and it's URL if available.
              The source should have then the following fields: ${Object.keys(CLAIM_SOURCE_OBJECT).join(", ")}
              Please group the claims for the given influencer in an array of JSON objects, under the following key: ${Object.keys(CLAIMS_RESPONSE_OBJECT).join("")}.
              If you cannot find any recent claim for the influencer, just return an empty array on the corresponding object key.
            `
          },
        ],
        temperature: 1,
      }
  
      const { response } = await this.aiProvider.getStructuredResponse<ClaimsResponse>(requestBody, claimsAISchema);
      const claims = response?.claims;
  
      if (claims?.length) {
        if (!isValidType<Claim>(['quote', 'title', 'category'], claims[0])) {
          throw new Error(`Invalid Claim object, received: ${JSON.stringify(response)}`);
        }

        influencersClaims.push({
          influencerName,
          claims,
        });
      }
    }
    
    const influencerClaims = await this.claimsRepository.saveClaimsForInfluencers(influencersClaims, this.aiProvider.aiProviderModel);
  
    return influencerClaims;
  }
}