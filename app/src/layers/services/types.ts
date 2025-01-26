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
