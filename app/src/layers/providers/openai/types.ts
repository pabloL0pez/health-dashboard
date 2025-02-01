import { ChatModel } from "openai/resources/index.mjs";
import { AIProviderType, AIRequestBody } from "../types";

export type OpenAIModelType = ChatModel

export interface OpenAIRequestBody extends AIRequestBody {
  model: OpenAIModelType;
}

export interface OpenAIProviderModel {
  provider: AIProviderType.OpenAI;
  model: OpenAIModelType;
}