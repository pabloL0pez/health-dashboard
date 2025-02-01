/**
 * Base AI provider interface. All AI providers should implement this interface.
 */
export interface AIProvider {
  getStructuredResponse: <T>(requestBody: AIRequestBody) => Promise<AIResponse<T>>;
}

export enum RoleType {
  Assistant = 'assistant',
  System = 'system',
  User = 'user',
}

export interface AIMessage {
  role: RoleType;
  content: string;
}

export interface AIRequestBody {
  messages: AIMessage[];
  temperature?: number;
}

export enum AIProviderType {
  Perplexity = 'perplexity',
  DeepSeek = 'deepseek',
  OpenAI = 'openai',
}

export interface AIProviderModel {
  provider: AIProviderType;
  model: string;
}

export interface AIResponse<T> extends AIProviderModel {
  response: T | null;
}
