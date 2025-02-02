import { PerplexityModelType } from "../layers/providers/perplexity/types";
import { AIProviderType } from "../layers/providers/types";
import { AIProviderModel, HandlerError } from "./types";

export const buildHandlerError = (event: unknown): string => {
  const error: HandlerError = {
    message: `Invalid event object, received: ${JSON.stringify(event)}`,
  }

  return JSON.stringify(error);
}

export const isValidaAIProviderModel = (aiProviderModel: AIProviderModel): boolean => {
  if (aiProviderModel.provider === AIProviderType.Perplexity) {
    switch (aiProviderModel.model) {
      case 'sonar': return true;
      case 'sonar-pro': return true;
      case 'sonar-reasoning': return true;
      default: return false;
    }
  }

  if (aiProviderModel.provider === AIProviderType.OpenAI) {
    switch (aiProviderModel.model) {
      case 'o3-mini': return true 
      case 'o3-mini-2025-01-31': return true
      case 'o1': return true
      case 'o1-2024-12-17': return true
      case 'o1-preview': return true
      case 'o1-preview-2024-09-12': return true
      case 'o1-mini': return true
      case 'o1-mini-2024-09-12': return true
      case 'gpt-4o': return true
      case 'gpt-4o-2024-11-20': return true
      case 'gpt-4o-2024-08-06': return true
      case 'gpt-4o-2024-05-13': return true
      case 'gpt-4o-audio-preview': return true
      case 'gpt-4o-audio-preview-2024-10-01': return true
      case 'gpt-4o-audio-preview-2024-12-17': return true
      case 'gpt-4o-mini-audio-preview': return true
      case 'gpt-4o-mini-audio-preview-2024-12-17': return true
      case 'chatgpt-4o-latest': return true
      case 'gpt-4o-mini': return true
      case 'gpt-4o-mini-2024-07-18': return true
      case 'gpt-4-turbo': return true
      case 'gpt-4-turbo-2024-04-09': return true
      case 'gpt-4-0125-preview': return true
      case 'gpt-4-turbo-preview': return true
      case 'gpt-4-1106-preview': return true
      case 'gpt-4-vision-preview': return true
      case 'gpt-4': return true
      case 'gpt-4-0314': return true
      case 'gpt-4-0613': return true
      case 'gpt-4-32k': return true
      case 'gpt-4-32k-0314': return true
      case 'gpt-4-32k-0613': return true
      case 'gpt-3.5-turbo': return true
      case 'gpt-3.5-turbo-16k': return true
      case 'gpt-3.5-turbo-0301': return true
      case 'gpt-3.5-turbo-0613': return true
      case 'gpt-3.5-turbo-1106': return true
      case 'gpt-3.5-turbo-0125': return true
      case 'gpt-3.5-turbo-16k-0613': return true
      default: return false;
    }
  }

  throw new Error(`No valid AI provider/model was facilitated, received: ${aiProviderModel.provider}/${aiProviderModel.model}`);
}