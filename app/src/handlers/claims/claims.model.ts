import { AIService } from "../../layers/services/ai.service";

export class ClaimsModel {
  constructor(private readonly aiService: AIService) {}

  async getClaims(influencers: string[]): Promise<any> {
    return Promise.resolve(influencers);
  }
}