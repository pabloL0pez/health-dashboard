import { ALBResult } from "aws-lambda";

export type HandlerResult = Promise<ALBResult>;

export interface Handler<T> {
  handleEvent: (event: T) => HandlerResult;
}

export interface HandlerError {
  message: string;
}