import { iClaimsVerificationService } from "./claims-verification.service";
import { ClaimsVerificationEvent, InfluencerVerifiedClaims } from "./types";

export interface iClaimsVerificationController {
  getVerifiedClaims(influencerName: string): Promise<InfluencerVerifiedClaims>;
}

export class ClaimsVerificationController implements iClaimsVerificationController {
  constructor(private readonly claimsVerificationService: iClaimsVerificationService) {}

  public async getVerifiedClaims(influencerName: string): Promise<InfluencerVerifiedClaims> {
    return await this.claimsVerificationService.verifyHealthClaims(influencerName);
  }
}
