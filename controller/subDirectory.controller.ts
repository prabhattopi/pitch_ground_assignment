import asyncHandler from "express-async-handler";

import Todo from "../models/subDirectorymodels";
import { Response } from "express";
import { RequestWithUser } from "../middlewares/authMiddleware";


//@des Get Todo
//@route POST /todo-item/list
//@access Private

const getGoals = asyncHandler(async (req: RequestWithUser, res: Response) => {
  const { page = 1, limit = 5, order = "asc" } = req.query;
  let arrangeData: any = 1;
  if (order === "asc") {
    arrangeData = 1;
  } else if (order === "desc") {
    arrangeData = -1;
  }
  const skip: number = (Number(page) - 1) * Number(limit);
  const goals = await Todo.find({ user: req.user?.id })
    .limit(Number(limit))
    .skip(skip)
    .sort({ createdAt: arrangeData });
  console.log(goals);
  res.status(200).json({ page, limit, goals });
});
const getGoalsDone = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const { page = 1, limit = 5, order = "asc" } = req.query;
    let arrangeData: any = 1;
    if (order === "asc") {
      arrangeData = 1;
    } else if (order === "desc") {
      arrangeData = -1;
    }
    const skip: number = (Number(page) - 1) * Number(limit);
    const goals = await Todo.find({
      user: req.user?.id,
      status: req.body.status,
    })
      .limit(Number(limit))
      .skip(skip)
      .sort({ createdAt: arrangeData });

    res.status(200).json({ page, limit, goals });
  }
);

//@des Set Todo
//@route POST /todo-item/create
//@access Private

const setGoals = asyncHandler(async (req: RequestWithUser, res: Response) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please add a title field");
  }
  const goal = await Todo.create({
    title: req.body.title,

    user: req.user?.id,
  });
  res.status(200).json(goal);
});

//@des Updatet Todo
//@route POST /todo-item/mark-as-done || /todo-item/mark-as-not-done||
//@access Private

const updateGoals = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const goal = await Todo.findById(req.body._id);
    if (!goal) {
      res.status(400);
      throw new Error("Todo not found");
    }

    //check for user
    if (!req.user) {
      res.status(400);
      throw new Error("Folder not found");
    }
    //Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("Not a Correct folder/directory");
    }
    const updateGoal = await Todo.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.status(200).json(updateGoal);
  }
);

//@des delete goals
//@route DELETE /todo-item/move-to-directory
//@access Private

const deleteGoals = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const goal = await Todo.findByIdAndRemove(req.body._id);
    if (!goal) {
      res.status(400);
      throw new Error("Todo not Found");
    }

    //check for user
    if (!req.user) {
      res.status(400);
      throw new Error("Folder Not Found");
    }
    //Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("Not a Correct Folder");
    }

    res.status(200).json({ id: req.body._id });
  }
);

export { getGoals, setGoals, updateGoals, deleteGoals, getGoalsDone };
