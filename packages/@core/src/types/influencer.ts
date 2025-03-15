import { VerifiedClaim } from "types/claim";

export interface Influencer {
  id: string;
  rank: number;
  name: string;
  bio: string;
  instagramUser?: string;
  twitterUser?: string;
  image?: string;
  claims: VerifiedClaim[];
}