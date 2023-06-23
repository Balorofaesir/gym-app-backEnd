import { Router } from 'express';

import { isAuthenticated } from '../../auth/auth.services';

import {
  handleAllGetUsers,
  handleCreateUser,
  handleDeleteUser,
  handleGetUser,
  handleUpdateUser,
  handleGetMe,
  handleNewCaloriesBurnedObjectArray,
  handleGetIMC
} from './user.controller';

const router = Router();

// RESTful API

// GET /api/users
router.get('/', handleAllGetUsers);
// GET /api/calculateIMC
router.get('/calculateIMC', isAuthenticated, handleGetIMC);
// POST /api/users/me
router.get('/me', isAuthenticated, handleGetMe);
// POST /api/users
router.post('/', handleCreateUser);
// PATCH /api/users/:me
router.patch('/edit/me',isAuthenticated,handleUpdateUser);
// PATCH /api/users/add
router.patch('/add/myCaloriesBurnedRecord',isAuthenticated,handleNewCaloriesBurnedObjectArray);
// DELETE /api/users/:id
router.delete('/:id', isAuthenticated, handleDeleteUser);

export default router;
