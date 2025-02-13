import { iClaimsService } from "./claims.service";
import { DEFAULT_MAX_CLAIMS } from "./constants";
import { InfluencerClaims } from "./types";

export interface iClaimsController {
  getClaims: (influencers: string[], maxClaims: number) => Promise<InfluencerClaims[]>
}

export class ClaimsController implements iClaimsController {
  constructor(private readonly claimsService: iClaimsService) {}

  public async getClaims(influencers: string[], maxClaims: number = DEFAULT_MAX_CLAIMS): Promise<InfluencerClaims[]> {
    return await this.claimsService.identifyHealthClaims(influencers, maxClaims);
  }
}