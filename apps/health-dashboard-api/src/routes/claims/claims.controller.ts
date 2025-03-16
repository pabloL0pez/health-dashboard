import { ClaimV2 } from '@core/health-dashboard';
import { iClaimsService } from './claims.service.js';

export interface iClaimsController {
  getClaims: (query: string) => Promise<ClaimV2[]>
}

export class ClaimsController implements iClaimsController {
  constructor(private readonly claimsService: iClaimsService) {}

  public async getClaims(query: string): Promise<ClaimV2[]> {
    return await this.claimsService.fetchClaims(query);
  }
}