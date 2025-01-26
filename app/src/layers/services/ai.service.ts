import { AIRequestBody } from "./types";

/**
 * Base AI service interface. All AI services should implement this interface.
 */
export interface AIService {
  getStructuredResponse: <T>(requestBody: AIRequestBody) => Promise<T | null>;
}