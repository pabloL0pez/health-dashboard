import { ChatModel } from "openai/resources/index.mjs";
import { AIRequestBody } from "../types";

export type OpenAIModelType = ChatModel

export interface OpenAIRequestBody extends AIRequestBody {
  model: OpenAIModelType;
}