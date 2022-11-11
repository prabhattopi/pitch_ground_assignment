"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const mainDirectory_controller_1 = require("../controller/mainDirectory.controller");
const router = express_1.default.Router();
exports.router = router;
router.post("/create", mainDirectory_controller_1.createFolder);
router.post("/list", mainDirectory_controller_1.getFoldersList);
router.post("/remove", mainDirectory_controller_1.removeFolder);
