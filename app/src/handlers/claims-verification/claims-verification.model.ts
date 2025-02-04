import { Schema } from "mongoose";
import { ClaimVerificationDAO, ClaimVerificationScore, ClaimVerificationStatus } from "./types";
import { ClaimSourceSchema } from "../claims/claims.model";

const ClaimVerificationScoreSchema = new Schema<ClaimVerificationScore>({
  value: { type: Number, required: true },
  description: { type: String, default: null },
});

const ClaimVerificationStatusSchema = new Schema<ClaimVerificationStatus>({
  value: { type: String, required: true },
  description: { type: String, default: null },
});

export const ClaimSchema = new Schema<ClaimVerificationDAO>({
  score: { type: ClaimVerificationScoreSchema, required: true },
  status: { type: ClaimVerificationStatusSchema, required: true },
  sources: { type: [ClaimSourceSchema], default: [] }
});