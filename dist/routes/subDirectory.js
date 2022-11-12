"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const subDirectory_controller_1 = require("../controller/subDirectory.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
router.route("/list").post(authMiddleware_1.protect, subDirectory_controller_1.getGoals);
router.route("/create").post(authMiddleware_1.protect, subDirectory_controller_1.setGoals);
router.route("/mark-as-done").post(authMiddleware_1.protect, subDirectory_controller_1.updateGoals);
router.route("/mark-as-not-done").post(authMiddleware_1.protect, subDirectory_controller_1.updateGoals);
router.route("/move-to-directory").post(authMiddleware_1.protect, subDirectory_controller_1.updateGoals);
router.route("/list-done").post(authMiddleware_1.protect, subDirectory_controller_1.getGoalsDone);
router.route("/list-notdone").post(authMiddleware_1.protect, subDirectory_controller_1.getGoalsDone);
