import { Schema } from "mongoose";
import { ClaimVerificationScore, ClaimVerificationStatus } from "types/claim";
import { ClaimVerificationDAO } from 'types/claimDAO';
import { ClaimSource } from "types/claim";
import { ClaimDAO } from "types/claimDAO";

const ClaimVerificationScoreSchema = new Schema<ClaimVerificationScore>({
  value: { type: Number, required: true },
  description: { type: String, default: null },
});

const ClaimVerificationStatusSchema = new Schema<ClaimVerificationStatus>({
  value: { type: String, required: true },
  description: { type: String, default: null },
});

export const ClaimSourceSchema = new Schema<ClaimSource>({
  source: { type: String, required: true },
  url: { type: String, default: null },
});

export const ClaimVerificationSchema = new Schema<ClaimVerificationDAO>({
  score: { type: ClaimVerificationScoreSchema, required: true, _id: false },
  status: { type: ClaimVerificationStatusSchema, required: true, _id: false },
  sources: { type: [ClaimSourceSchema], default: [] }
});

export const ClaimSchema = new Schema<ClaimDAO>({
  id: { type: String, required: true },
  quote: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  source: { type: ClaimSourceSchema, default: null, _id: false },
  verification: { type: ClaimVerificationSchema, default: null, _id: false },
});