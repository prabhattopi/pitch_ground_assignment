"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGoals = exports.updateGoals = exports.setGoals = exports.getGoals = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const subDirectorymodels_1 = __importDefault(require("../models/subDirectorymodels"));
//@des Get Todo
//@route POST /todo-item/list
//@access Private
const getGoals = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const goals = yield subDirectorymodels_1.default.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
    console.log(goals);
    res.status(200).json(goals);
}));
exports.getGoals = getGoals;
//@des Set Todo
//@route POST /todo-item/create
//@access Private
const setGoals = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (!req.body) {
        res.status(400);
        throw new Error("Please add a title field");
    }
    const goal = yield subDirectorymodels_1.default.create({
        title: req.body.title,
        user: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
    });
    res.status(200).json(goal);
}));
exports.setGoals = setGoals;
//@des Updatet Todo
//@route POST /todo-item/mark-as-done || /todo-item/mark-as-not-done||
//@access Private
const updateGoals = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const goal = yield subDirectorymodels_1.default.findById(req.body._id);
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
    const updateGoal = yield subDirectorymodels_1.default.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
    });
    res.status(200).json(updateGoal);
}));
exports.updateGoals = updateGoals;
//@des delete goals
//@route DELETE /todo-item/move-to-directory
//@access Private
const deleteGoals = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const goal = yield subDirectorymodels_1.default.findByIdAndRemove(req.body._id);
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
}));
exports.deleteGoals = deleteGoals;
