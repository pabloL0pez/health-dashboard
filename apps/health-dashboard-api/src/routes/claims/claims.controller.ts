import { Claim, FiltersQuery } from '@core/health-dashboard';

export interface iClaimsController {
  fetchClaims: (query: FiltersQuery) => Claim[]
}

export class ClaimsController implements iClaimsController {
  constructor() {}

  public fetchClaims(query: FiltersQuery): Claim[] {
    return [];
  }
}