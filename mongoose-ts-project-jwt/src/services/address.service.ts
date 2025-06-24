// src/services/address.service.ts
import { AddressModel, IAddress } from "../models/address.model";

export const createAddress = async (
  data: Partial<IAddress>
): Promise<IAddress> => {
  const address = new AddressModel(data);
  return await address.save();
};

export const getAddresses = async (): Promise<IAddress[]> => {
  return await AddressModel.find().populate("user", "name email");
};

export const getAddressById = async (id: string): Promise<IAddress | null> => {
  return await AddressModel.findById(id).populate("user", "name email");
};

export const updateAddress = async (
  id: string,
  data: Partial<IAddress>
): Promise<IAddress | null> => {
  return await AddressModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteAddress = async (id: string): Promise<IAddress | null> => {
  return await AddressModel.findByIdAndDelete(id);
};
