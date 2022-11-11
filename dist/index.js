"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const config_1 = __importDefault(require("config"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const connect_1 = __importDefault(require("./db/connect"));
const port = config_1.default.get("port");
const host = config_1.default.get("host");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("tiny"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
const mainDirectory_1 = require("./routes/mainDirectory");
const subDirectory_1 = require("./routes/subDirectory");
app.use("/directory", mainDirectory_1.router);
app.use("/todo-item", subDirectory_1.router);
app.use(errorMiddleware_1.errorHandle);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://${host}:${port}`);
    (0, connect_1.default)();
});
