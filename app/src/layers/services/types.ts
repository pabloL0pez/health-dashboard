/**
 * Base AI service interface. All AI services should implement this interface.
 */
export interface AIService {
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
