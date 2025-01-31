/**
 * Base AI provider interface. All AI providers should implement this interface.
 */
export interface AIProvider {
  getStructuredResponse: <T>(requestBody: AIRequestBody) => Promise<T>;
}

export enum LLMType {
  Sonar = 'sonar',
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
  model: LLMType;
  messages: AIMessage[];
}
