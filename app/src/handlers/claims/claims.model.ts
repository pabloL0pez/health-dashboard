import { Schema } from "mongoose";
import { ClaimDAO } from "./types";

export const ClaimSchema = new Schema<ClaimDAO>({
  quote: { type: String, require: true },
  title: { type: String, require: true },
  category: { type: String, require: true },
  score: { type: Number, require: true },
  status: { type: String, require: true },
});