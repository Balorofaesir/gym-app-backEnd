import { Request, Response, NextFunction } from 'express';

import { AuthRequest } from '../../auth/auth.types';
import {
  getAllActivities,
  getActivityById,
  createActivity,
  addSingleActivity,
  deleteActivity,
  deleteSingleActivity
} from './activities.services'

export async function handleGetAllActivities(req: Request, res: Response, next: NextFunction) {

  try {
    const activities = await getAllActivities();
    return res.status(200).json(activities);
  } catch (error) {
    console.log("getAllActivities-error", error);
    return res.status(500).json(error);
  }
}

export async function handleGetActivityById(req: AuthRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const user = req.user;

  const fav = await getActivityById(id, user?._id);

  if (!fav || fav.length < 1) {
    return res.status(404).json({ message: 'Activity not found' });
  }

  return res.status(200).json(fav);
}

export async function handleCreateActivity(req: AuthRequest, res: Response, next: NextFunction) {
  const data = req.body;
  const user = req.user
  try {
    const fav = {
      ...data,
      createdBy:user?._id,
  }
    const NewActivity = await createActivity(fav);

    return res.status(201).json(NewActivity);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleAddActivity(req: AuthRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = req.body;
  const user = req.user
  try {
    const UpdatedActivityList = await addSingleActivity(id, user?._id, data );
    console.log(UpdatedActivityList)

    return res.status(201).json(UpdatedActivityList);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleDeleteSingleActivity(req: AuthRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = req.body;
  const user = req.user

  try {
    const UpdatedActivityList = await deleteSingleActivity(id, user?._id, data );
    return res.status(201).json(UpdatedActivityList);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleDeleteActivity(req: AuthRequest, res: Response,  next: NextFunction) {
  const { id } = req.params;
  const user = req.user;
  
  try {
   const deleted = await deleteActivity(id, user?._id )
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
