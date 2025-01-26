import { ALBResult } from "aws-lambda";

export type HandlerResult = Promise<ALBResult>;

export interface Handler<T = any> {
  handleEvent: (event: T) => HandlerResult;
}