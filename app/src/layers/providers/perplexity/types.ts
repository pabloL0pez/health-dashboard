import { AIMessage, AIRequestBody } from "../types";

export enum PerplexityLLMType {
  Sonar = 'sonar',
}

export interface PerplexityAIRequestBody extends AIRequestBody {
  model: PerplexityLLMType;
  return_images?: boolean;
}

export interface PerplexityChoice {
  index: number;
  finish_reason: string;
  message: AIMessage;
  delta: AIMessage;
}

export interface PerplexityResponse {
  choices: PerplexityChoice[];
}