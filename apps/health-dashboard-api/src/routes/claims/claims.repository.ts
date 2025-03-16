import { DALRepository, InfluencerDAO, MapFiltersSelection, VerifiedClaim } from "@core/health-dashboard";
import { Model } from "mongoose";

export interface iClaimsRepository {
  findClaims: (filters: MapFiltersSelection) => Promise<VerifiedClaim[]>;
}

export class ClaimsRepository implements iClaimsRepository {
  constructor(private readonly dalRepository: DALRepository<InfluencerDAO>) {}

  public async findClaims(): Promise<VerifiedClaim[]> {
    // const result = this.dalRepository.query<Model<InfluencerDAO>>((model) => {
    //   return model?.aggregate<InfluencerDAO[]>([]);
    // });

    return [];
  }

  /**
   * aggregation
   * 
   * [
      {
        "$set": {
          "claims": {
            "$filter": {
              "input": "$claims",
              "as": "claim",
              "cond": { 
                "$and": [
                  {"$in": ["$$claim.category", ["exercise"]]},
                  {"$eq": ["$$claim.verification.score.value", "confirmed"]}
                ],
              }
            }
          }
        }
      },
      {
        "$match": {
          "claims": { "$ne": [] }
        }
      }
    ]
   */
}
