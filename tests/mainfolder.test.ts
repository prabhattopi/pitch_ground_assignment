import supertest from "supertest";
import app from "../logicofServer"
import jwt from "jsonwebtoken"
import { generateToken } from "../controller/mainDirectory.controller";
import mongoose from "mongoose";
import * as UserService from "../controller/mainDirectory.controller"

const userId = new mongoose.Types.ObjectId().toString();
const userPayload = {
    _id: userId,

    name: "testFolder",
    token:generateToken(userId)
  };

describe("user", () => {
    // user registration
  
    describe("user registration", () => {
        describe("Create the Folder with valid name", () => {
            it("should return the user payload", async () => {
              const createUserServiceMock = jest
              
            //     // @ts-ignore
            //     // .mockReturnValueOnce(userPayload);
      
              const { statusCode, body } = await supertest(app)
                .post("/create")
                .send({"name":'testFolder'});
      
              expect(statusCode).toBe(200);
      
              expect(body).toEqual(userPayload);
      
              expect(createUserServiceMock).toHaveBeenCalledWith({"name":"testFolder"});
            });
          });
    })
    })