import { DocumentDefinition, FilterQuery } from "mongoose";

import Favorite, { FavoriteDocument } from "./favorites.model";

export function getAllFavoritesByCreator(createdBy: string) {
  console.log({ createdBy: createdBy });

  return Favorite.find({ createdBy: createdBy }).populate({
    path: "createdBy",
    select: "Username",
  });
}

export function getFavoriteById(id: string, createdBy: string) {
  return Favorite.find({ _id: id, createdBy: createdBy }).populate({
    path: "createdBy",
    select: "Username",
  });
  // .populate('createdBy');
}

export async function searchFavorite(filter?: FilterQuery<FavoriteDocument>) {
  const favorites = filter ? await Favorite.find(filter) : await Favorite.find();
  return favorites;
}

export async function createFavorite(
  input: DocumentDefinition<Omit<FavoriteDocument, "createdAt" | "updatedAt">>
) {
  return Favorite.create(input);
}

export function addSingleFavorite(id: string, createdBy: string, data: object) {
  return Favorite.findOneAndUpdate(
    { _id: id, createdBy: createdBy },
    { $push: data },
    { new: true }
  );
}

export function deleteSingleFavorite(id: string, createdBy: string, data: object) {
  return Favorite.findOneAndUpdate(
    { _id: id, createdBy: createdBy },
    //had to pass all the same values of the object in the array to be able to erase
    {
      $pull: { favorites: { $in: [data] }},
    },
    { new: true }
  );
}

export function deleteFavorite(id: string, createdBy: string) {
  return Favorite.findOneAndRemove({ _id: id, createdBy: createdBy });
}
