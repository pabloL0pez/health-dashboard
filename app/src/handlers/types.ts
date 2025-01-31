import { ALBResult } from "aws-lambda";
import { AIProviderModel } from "../layers/providers/types";

export type HandlerResult = Promise<ALBResult>;

export interface Handler<T> {
  handleEvent: (event: T) => HandlerResult;
}

export interface HandlerError {
  message: string;
}

export interface AIProviderHandler {
  influencers?: AIProviderModel;
  claims?: AIProviderModel;
}