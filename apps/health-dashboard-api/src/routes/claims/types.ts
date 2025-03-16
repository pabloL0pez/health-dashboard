import { ClaimV2, FiltersQuery } from "@core/health-dashboard";

export interface ClaimsResponse {
  claims: ClaimV2[];
}

export interface RequestClaims {
  query: FiltersQuery,
}

export interface ReplyClaims {
  200: ClaimsResponse;
  500: { message: string };
}