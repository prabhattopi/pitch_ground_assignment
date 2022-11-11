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
exports.removeFolder = exports.getFoldersList = exports.createFolder = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mainDirectory_models_1 = __importDefault(require("../models/mainDirectory.models"));
const config_1 = __importDefault(require("config"));
//desc create new directory
//@route POST /directory/create
//@access Public
const JWT_SECRET = config_1.default.get("host");
const createFolder = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error("Please add a Unique name");
    }
    const folder = yield mainDirectory_models_1.default.findOne({ name });
    if (folder) {
        res.status(400);
        throw new Error("Folder is Already Exist");
    }
    const newFolder = yield mainDirectory_models_1.default.create({
        name
    });
    console.log(newFolder);
    if (newFolder) {
        res.status(201).json({
            _id: newFolder.id,
            name: newFolder.name,
            token: generateToken(newFolder._id)
        });
    }
}));
exports.createFolder = createFolder;
//desc list directory
//@route POST /directory/list
//@access Public
const getFoldersList = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allFolder = yield mainDirectory_models_1.default.find();
    res.status(200).json(allFolder);
}));
exports.getFoldersList = getFoldersList;
//desc remove  directory
//@route POST /directory/remove
//@access Public
const removeFolder = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const removeoneFolder = yield mainDirectory_models_1.default.findOneAndDelete({ name });
    res.status(200).json({ message: "Success" });
}));
exports.removeFolder = removeFolder;
//Generate JWT
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, JWT_SECRET);
};
