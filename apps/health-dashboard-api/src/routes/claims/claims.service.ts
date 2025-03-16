import { ClaimV2, queryParamsToFilterSelection } from "@core/health-dashboard";
import { iClaimsRepository } from "./claims.repository.js";
import { VerifiedClaimWithInfluencer } from "./types.js";

export interface iClaimsService {
  fetchClaims: (query: string) => Promise<ClaimV2[]>;
}

export class ClaimsService implements iClaimsService {
  constructor(private readonly claimsRepository: iClaimsRepository) {}

  public async fetchClaims(query: string): Promise<ClaimV2[]> {
    const claims = await this.claimsRepository.findClaims(queryParamsToFilterSelection(query));

    return this.mapClaims(claims);
  }

  private mapClaims(claims: VerifiedClaimWithInfluencer[]): ClaimV2[] {
    return claims.map(({ influencerName, claim: { quote, category, date, source }, verification: { score: { value: score }, sources, status: { value: status, description }} }) => ({
      influencerName,
      quote,
      categories: [category],
      date,
      source,
      verification: {
        score,
        status,
        description,
        sources,
      }
    }));
  }
}