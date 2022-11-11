"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
function connect() {
    const dbUri = config_1.default.get("dbUri");
    return mongoose_1.default
        .connect(dbUri)
        .then(() => {
        console.log("Database Connected");
    })
        .catch((error) => {
        console.error("db error", error);
        process.exit(1);
    });
}
exports.default = connect;
