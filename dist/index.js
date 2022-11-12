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
const config_1 = __importDefault(require("config"));
const connect_1 = __importDefault(require("./db/connect"));
const logicofServer_1 = __importDefault(require("./logicofServer"));
const port = config_1.default.get("port");
const host = config_1.default.get("host");
logicofServer_1.default.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`⚡️[server]: Server is running at https://${host}:${port}`);
    yield (0, connect_1.default)();
}));
