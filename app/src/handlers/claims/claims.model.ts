import { Schema } from "mongoose";
import { ClaimDAO, ClaimSource } from "./types";

export const ClaimSourceSchema = new Schema<ClaimSource>({
  source: { type: String, required: true },
  url: { type: String, default: null },
})

export const ClaimSchema = new Schema<ClaimDAO>({
  id: { type: String, required: true },
  quote: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  source: { type: ClaimSourceSchema, default: null },
});