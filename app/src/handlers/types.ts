import { ALBResult } from "aws-lambda";
import { PerplexityAIProviderModel } from "../layers/providers/perplexity/types";
import { OpenAIProviderModel } from "../layers/providers/openai/types";
import { AIProvider, AIProviderType } from "../layers/providers/types";
import { PerplexityProvider } from "../layers/providers/perplexity/perplexity.provider";
import { OpenAIProvider } from "../layers/providers/openai/openai.provider";

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

export type HandlerEvent<T> = T & { aiProviderModel: AIProviderModel };

export abstract class HandlerProvider {
  protected readonly aiProvider: AIProvider = this.aiProviderResolver();

  constructor(readonly aiProviderModel: AIProviderModel) {}

  private aiProviderResolver(): AIProvider {
    if (this.aiProviderModel.provider === AIProviderType.Perplexity) {
      return new PerplexityProvider(this.aiProviderModel.model);
    }

    if (this.aiProviderModel.provider === AIProviderType.OpenAI) {
      return new OpenAIProvider(this.aiProviderModel.model);
    }

    throw new Error(`No valid AI provider/model was facilitated, received: ${this.aiProviderModel.provider}/${this.aiProviderModel.model}`);
  }
}