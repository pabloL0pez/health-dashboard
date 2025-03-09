import { ClaimDAO } from "types/claimDAO";

export interface InfluencerDAO {
  id: string;
  name: string;
  bio: string;
  rank: number;
  instagramUser?: string;
  twitterUser?: string;
  claims?: ClaimDAO[];
  image?: Buffer;
}