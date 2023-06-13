import { Request, Response, NextFunction } from 'express';

import { AuthRequest } from '../../auth/auth.types';
import {
  getAllFavoritesByCreator,
  getFavoriteById,
  createFavorite,
  addSingleFavorite,
  deleteFavorite,
  deleteSingleFavorite
} from './favorites.services'

export async function handleGetAllFavoritesByCreator(req: AuthRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const user = req.user;
  
  try {
   const AllFavoritesByUser = await getAllFavoritesByCreator(user?._id)
    if (!AllFavoritesByUser) {
      return res.status(404).json({ message: 'Not authorized user' });
    }
      return res.status(200).json(AllFavoritesByUser);
  } catch (error) {
      console.log(error);
      return res.status(500).json(error);
  }
}

export async function handleGetFavoriteById(req: AuthRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const user = req.user;

  const fav = await getFavoriteById(id, user?._id);

  if (!fav || fav.length < 1) {
    return res.status(404).json({ message: 'Favorite not found' });
  }

  return res.status(200).json(fav);
}

export async function handleCreateFavorite(req: AuthRequest, res: Response, next: NextFunction) {
  const data = req.body;
  const user = req.user
  try {
    const fav = {
      ...data,
      createdBy:user?._id,
  }
    const NewFavorite = await createFavorite(fav);

    return res.status(201).json(NewFavorite);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleAddFavorite(req: AuthRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = req.body;
  const user = req.user
  try {
    const UpdatedFavoriteList = await addSingleFavorite(id, user?._id, data );
    console.log(UpdatedFavoriteList)

    return res.status(201).json(UpdatedFavoriteList);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleDeleteSingleFavorite(req: AuthRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = req.body;
  const user = req.user

  try {
    const UpdatedFavoriteList = await deleteSingleFavorite(id, user?._id, data );
    return res.status(201).json(UpdatedFavoriteList);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleDeleteFavorite(req: AuthRequest, res: Response,  next: NextFunction) {
  const { id } = req.params;
  const user = req.user;
  
  try {
   const deleted = await deleteFavorite(id, user?._id )
   console.log("deleted:",deleted)
    if (!deleted) {
      return res.status(404).json({ message: 'Not authorized user' });
    }
      return res.status(200).json(deleted);
  } catch (error) {
      console.log(error);
      return res.status(500).json(error);
  }
}
