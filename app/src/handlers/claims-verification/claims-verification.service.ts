import { promptsDictionary } from "../../layers/providers/constants";
import { AIProvider, AIRequestBody } from "../../layers/providers/types";
import { isValidType } from "../../layers/utils/typeGuard";
import { iClaimsRepository } from "../claims/claims.repository";
import { UNVERIFIABLE_CLAIM_SCORE } from "../claims/constants";
import { claimsVerificationAISchema } from "./claims-verification.ai-schema";
import { iClaimsVerificationRepository } from "./claims-verification.repository";
import { VERIFIED_CLAIMS_RESPONSE_OBJECT } from "./constants";
import { ClaimVerification, InfluencerVerifiedClaims, VerifiedClaim, VerifiedClaimsResponse } from "./types";

export interface iClaimsVerificationService {
  verifyHealthClaims: (influencerName: string) => Promise<InfluencerVerifiedClaims>
}

export class ClaimsVerificationService implements iClaimsVerificationService {
  constructor(
    private readonly aiProvider: AIProvider,
    private readonly claimsRepository: iClaimsRepository,
    private readonly claimsVerificationRepository: iClaimsVerificationRepository,
  ) {}

  public async verifyHealthClaims(influencerName: string): Promise<InfluencerVerifiedClaims> {
    const { system: { preciseAndComplete, structuredJSONData, noComments } } = promptsDictionary;
    const verifiedClaims: VerifiedClaim[] = [];

    const claims = await this.claimsRepository.findClaimsByInfluencer(influencerName);

    for (let claim of claims) {
      const requestBody: AIRequestBody = {
        messages: [
          {
            role: 'system',
            content: `
              You are a scientific journal, in charge of fact checking and verifying claims made by health influencers across social media.
              Use scientific, trusted sources to check and back your findings.
              ${preciseAndComplete}
              ${structuredJSONData}
              ${noComments}
            `
          },
          {
            role: 'user',
            content: `
              Please validate the following health claim made by ${influencerName} against different scientific journals / studies or any other trusted source.

              Claim: "${claim.quote}"

              Based on the evidence collected, calculate a trust score from 0 to 100.
              Based on the calculated score, assing a status of either 'confirmed', 'questionable' or 'debunked'.
              Return a JSON object with your findings, with the following structure: ${JSON.stringify(VERIFIED_CLAIMS_RESPONSE_OBJECT)}
              The provided values are just for reference.
              The score should be returned along with a description, justifying the calculated score.
              The status should be returned along with a description, justifying the assigned status.
              Try to include an array with the cited sources, along with an URL to the source if possible.

              If it's not possible to verify the claim, just assign a score of ${UNVERIFIABLE_CLAIM_SCORE}, a status of 'unverifiable' and an empty sources array.
            `
          },
        ],
        temperature: 1,
      }

      const { response } = await this.aiProvider.getStructuredResponse<VerifiedClaimsResponse>(requestBody, claimsVerificationAISchema);
      const verification = response?.verification;

      if (verification) {
        if (!isValidType<ClaimVerification>(['score', 'status', 'sources'], verification)) {
          throw new Error(`Invalid ClaimVerification object, received: ${JSON.stringify(verification)}`);
        }

        verifiedClaims.push({ claim, verification });
      }
    }

    return await this.claimsVerificationRepository.saveVerifiedClaimsForInfluencer({ influencerName, verifiedClaims }, this.aiProvider.aiProviderModel);
  }
}