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

export const ClaimVerificationSchema = new Schema<ClaimVerificationDAO>({
  score: { type: ClaimVerificationScoreSchema, required: true, _id: false },
  status: { type: ClaimVerificationStatusSchema, required: true, _id: false },
  sources: { type: [ClaimSourceSchema], default: [] }
});