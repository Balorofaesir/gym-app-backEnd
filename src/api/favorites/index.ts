import { Router } from 'express';

import { isAuthenticated, hasRole } from '../../auth/auth.services';

import {
  handleGetAllFavoritesByCreator,
  handleCreateFavorite,
  handleDeleteFavorite,
  handleGetFavoriteById,
  handleAddFavorite,
  handleDeleteSingleFavorite
} from './favorites.controller';

const router = Router();
// RESTful API

// GET /api/favorites
router.get('/', handleGetAllFavoritesByCreator);
// GET /api/favorites/:id
router.get('/:id',isAuthenticated,handleGetFavoriteById);
// POST /api/favorites
router.post('/', isAuthenticated,handleCreateFavorite);
// PATCH /api/favorites/:id (adding an event)
router.patch('/:id', isAuthenticated, handleAddFavorite);
// PATCH /api/favorites/delete/:id (delete a single element of the array of favorites)
router.patch('/delete/:id', isAuthenticated, handleDeleteSingleFavorite);
// DELETE /api/favorites/:id
router.delete('/:id', isAuthenticated, handleDeleteFavorite);

export default router;
