import { AIMessage, AIRequestBody } from "../types";

export enum PerplexityLLMType {
  Sonar = 'sonar',
}

export interface PerplexityAIRequestBody extends AIRequestBody {
  model: PerplexityLLMType;
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