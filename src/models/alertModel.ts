import { Schema, model } from "mongoose";

interface IAlert {
  coinID: string;
  currency: string;
  threshold: number;
  condition: "above" | "below"; 
  triggered: boolean; 
}

const alertSchema = new Schema<IAlert>(
  {
    coinID: { type: String, required: true },
    currency: { type: String, default: "usd" },
    threshold: { type: Number, required: true },
    condition: { type: String, enum: ["above", "below"], required: true },
    triggered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<IAlert>("Alert", alertSchema);
