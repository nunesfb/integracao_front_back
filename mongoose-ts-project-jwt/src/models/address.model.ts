// src/models/address.model.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IAddress extends Document {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  user: Types.ObjectId; // Referência ao usuário (opcional)
}

const AddressSchema = new Schema<IAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },
  },
  {
    timestamps: true,
  }
);

export const AddressModel = model<IAddress>("Address", AddressSchema);
