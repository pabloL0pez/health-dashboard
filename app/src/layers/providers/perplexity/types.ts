import { AIProviderType, AIRequestBody } from "../types";

export type PerplexityModelType = 'sonar' | 'sonar-reasoning' | 'sonar-pro';

export interface PerplexityAIRequestBody extends AIRequestBody {
  model: PerplexityModelType;
  return_images?: boolean;
}

export interface PerplexityAIProviderModel {
  provider: AIProviderType.Perplexity;
  model: PerplexityModelType;
}