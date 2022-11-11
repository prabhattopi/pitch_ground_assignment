"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const folderSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please add a folder name"],
        min: 3,
        max: 20,
        unique: true,
    },
}, {
    timestamps: true,
});
const Folder = mongoose_1.default.model("Folder", folderSchema);
exports.default = Folder;
