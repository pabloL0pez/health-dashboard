import { InfluencersResponse } from "./types";

export const DEFAULT_TOP_N_INFLUENCERS = 10;

export const INFLUENCERS_SCHEMA: InfluencersResponse = {
  influencers: [
    {
      rank: 1,
      name: 'Michael Jordan',
      instagramUser: 'jumpman23',
      xUser: 'mjordan',
    },
    {
      rank: 2,
      name: 'LeBron James',
      instagramUser: 'kingjames',
      xUser: 'ljames',
    },
  ],
}