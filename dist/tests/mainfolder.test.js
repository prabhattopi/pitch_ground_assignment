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
const supertest_1 = __importDefault(require("supertest"));
const logicofServer_1 = __importDefault(require("../logicofServer"));
const mainDirectory_controller_1 = require("../controller/mainDirectory.controller");
const mongoose_1 = __importDefault(require("mongoose"));
const userId = new mongoose_1.default.Types.ObjectId().toString();
const userPayload = {
    _id: userId,
    name: "testFolder",
    token: (0, mainDirectory_controller_1.generateToken)(userId)
};
describe("user", () => {
    // user registration
    describe("user registration", () => {
        describe("Create the Folder with valid name", () => {
            it("should return the user payload", () => __awaiter(void 0, void 0, void 0, function* () {
                const createUserServiceMock = jest;
                //     // @ts-ignore
                //     // .mockReturnValueOnce(userPayload);
                const { statusCode, body } = yield (0, supertest_1.default)(logicofServer_1.default)
                    .post("/create")
                    .send({ "name": 'testFolder' });
                expect(statusCode).toBe(200);
                expect(body).toEqual(userPayload);
                expect(createUserServiceMock).toHaveBeenCalledWith({ "name": "testFolder" });
            }));
        });
    });
});
