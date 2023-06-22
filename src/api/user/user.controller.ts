import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../auth/auth.types";

import {
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
  addSingleBurnedCalories,
} from "./user.services";

export async function handleAllGetUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("handleAllGetUsers", req.body);
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log("🚀 handleAllGetUsers ~ error", error);
    return res.status(500).json(error);
  }
}

export async function handleGetMe(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const id = req.user?._id;
  console.log("id:", id);
  try {
    const user = await getUserById(id);
    // TODO: Search all info about user

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

export async function handleGetUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user.profile);
  } catch (error) {
    console.log("🚀 handleGetUser ~ error", error);
    return res.status(500).json(error);
  }
}

export async function handleCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data = req.body;
  try {
    const user = await createUser(data);

    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}

export async function handleUpdateUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const id = req.user?._id;
  const data = req.body;
  console.log(data);

  const user = await updateUser(id, data);

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  return res.status(200).json(user);
}

export async function handleDeleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  try {
    await deleteUser(id);

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleNewCaloriesBurnedObjectArray(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  // const { id } = req.params;
  const data = req.body;
  const user = req.user;
  console.log("hello");
  try {
    const UpdatedFavList = await addSingleBurnedCalories(
      // id,
      user?._id,
      data
    );

    return res.status(201).json(UpdatedFavList);
  } catch (error) {
    return res.status(500).json(error);
  }
}
//for adding a new object wi the handleNewCaloriesBurnedObjectArray to the array you must use the patch method with this:
// {
//   "myWeight" : [
//     {
//       CaloriesBurned: String,
//       date: Date,
//     }
//   ]
// }
export async function handleGetIMC(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const id = req.user?._id;
  console.log("id:", id);
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const calculation = user.weight / (user.height * user.height);
    console.log(calculation);
    return res.status(200).json({ IMC: calculation });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}
