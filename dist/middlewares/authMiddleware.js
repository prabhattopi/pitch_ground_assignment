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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mainDirectory_models_1 = __importDefault(require("../models/mainDirectory.models"));
const config_1 = __importDefault(require("config"));
const JWT_SECRET = config_1.default.get("JWT_SECRET");
const protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        //Get token from headers
        try {
            token = req.headers.authorization.split(" ")[1];
            //verified Token
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            //Get user from the token
            const user = yield mainDirectory_models_1.default.findById(decoded.id).select("-name");
            if (user) {
                req.user = user;
                next();
            }
            // console.log(req.user)
        }
        catch (err) {
            // console.log(err)
            res.status(401);
            throw new Error("Not a directory or folder exist");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("please select a correct folder");
    }
}));
exports.protect = protect;
