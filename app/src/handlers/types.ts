import { ALBResult } from "aws-lambda";
import { PerplexityAIProviderModel } from "../layers/providers/perplexity/types";
import { OpenAIProviderModel } from "../layers/providers/openai/types";

export type HandlerResult = Promise<ALBResult>;

export interface Handler<T> {
  handleEvent: (event: T) => HandlerResult;
}

export interface HandlerError {
  message: string;
}

export type AIProviderModel = OpenAIProviderModel | PerplexityAIProviderModel;

export interface AIProviderHandler {
  influencers?: AIProviderModel;
  claims?: AIProviderModel;
}

export type HandlerEvent<T> = T & AIProviderModel;