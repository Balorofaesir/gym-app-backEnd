import { Router } from 'express';

import { isAuthenticated, hasRole } from '../../auth/auth.services';

import {
  handleGetAllActivities,
  handleCreateActivity,
  handleDeleteActivity,
  handleGetActivityById,
  handleAddActivity,
  handleDeleteSingleActivity
} from './activities.controller';

const router = Router();
// RESTful API

// GET /api/activities
router.get('/', handleGetAllActivities);
// GET /api/activities/:id
router.get('/:id',isAuthenticated,handleGetActivityById);
// POST /api/activities
router.post('/', isAuthenticated,handleCreateActivity);
// PATCH /api/activities/:id (adding an event)
router.patch('/:id', isAuthenticated, handleAddActivity);
// PATCH /api/activities/delete/:id (delete a single element of the array of activities)
router.patch('/delete/:id', isAuthenticated, handleDeleteSingleActivity);
// DELETE /api/activities/:id
router.delete('/:id', isAuthenticated, handleDeleteActivity);

export default router;
