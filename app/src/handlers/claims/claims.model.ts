import { Schema } from "mongoose";
import { ClaimDAO, ClaimSource } from "./types";

const ClaimSourceSchema = new Schema<ClaimSource>({
  source: { type: String, required: true },
  url: { type: String, default: null },
})

export const ClaimSchema = new Schema<ClaimDAO>({
  quote: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  source: { type: ClaimSourceSchema, default: null },
  // score: { type: Number, require: true },
  // status: { type: String, require: true },
});