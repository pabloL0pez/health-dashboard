import { iClaimsVerificationService } from "./claims-verification.service";
import { ClaimsVerificationEvent, InfluencerVerifiedClaims } from "./types";

export interface iClaimsVerificationController {
  getVerifiedClaims(claimVerificationEvent: ClaimsVerificationEvent): Promise<InfluencerVerifiedClaims>;
}

export class ClaimsVerificationController implements iClaimsVerificationController {
  constructor(private readonly claimsVerificationService: iClaimsVerificationService) {}

  public async getVerifiedClaims({ influencerName }: ClaimsVerificationEvent): Promise<InfluencerVerifiedClaims> {
    return await this.claimsVerificationService.verifyHealthClaims(influencerName);
  }
}
