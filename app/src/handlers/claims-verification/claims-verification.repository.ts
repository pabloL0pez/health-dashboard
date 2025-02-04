import { DALRepository, DBQuery } from "../../layers/repository/types";
import { ClaimDAO } from "../claims/types";
import { InfluencerDAO } from "../influencers/types";
import { AIProviderModel } from "../types";
import { InfluencerVerifiedClaims, VerifiedClaim } from "./types";

export interface iClaimsVerificationRepository {
  saveVerifiedClaimsForInfluencer: (influencerVerifiedClaims: InfluencerVerifiedClaims, aiProviderModel: AIProviderModel) => Promise<InfluencerVerifiedClaims>
}

export class ClaimsVerificationRepository implements iClaimsVerificationRepository {
  constructor(private readonly dalRepository: DALRepository<InfluencerDAO>) {}

  public async saveVerifiedClaimsForInfluencer({ influencerName, verifiedClaims }: InfluencerVerifiedClaims, aiProviderModel: AIProviderModel): Promise<InfluencerVerifiedClaims> {
    const verifiedClaimsDAO = this.addVerificationToClaims(verifiedClaims);

    const claimsUpdateQuery: DBQuery<InfluencerDAO> = {
      field: 'claims',
      operator: 'set',
      value: verifiedClaimsDAO,
    }

    const updateResult = await this.dalRepository.updateOne(influencerName, claimsUpdateQuery);

    if (updateResult) {
      return { influencerName, verifiedClaims };
    }

    return { influencerName, verifiedClaims: [] };
  }

  private addVerificationToClaims(verifiedClaims: VerifiedClaim[]): ClaimDAO[] {
    return verifiedClaims.map(({ claim, verification }) => ({
      ...claim,
      verification,
    }));
  }
}