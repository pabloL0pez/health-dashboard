import { ClaimV2, queryParamsToFilterSelection, VerifiedClaim } from "@core/health-dashboard";
import { iClaimsRepository } from "./claims.repository.js";

export interface iClaimsService {
  fetchClaims: (query: string) => Promise<ClaimV2[]>;
}

export class ClaimsService implements iClaimsService {
  constructor(private readonly claimsRepository: iClaimsRepository) {}

  public async fetchClaims(query: string): Promise<ClaimV2[]> {
    const claims = await this.claimsRepository.findClaims(queryParamsToFilterSelection(query));

    return this.mapClaims(claims);
  }

  private mapClaims(claims: VerifiedClaim[]): ClaimV2[] {
    return claims.map(({ claim: { quote, category, date, source }, verification: { score: { value: score }, sources, status: { value: status, description }} }) => ({
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