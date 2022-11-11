"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const todoItemSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Folder",
    },
    title: {
        type: String,
        require: [true, "Please add title"],
        min: 3,
        max: 15
    },
    status: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});
const Todo = mongoose_1.default.model("Todo", todoItemSchema);
exports.default = Todo;
