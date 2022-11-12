import express, { Express, Request, Response } from "express";
import { errorHandle } from "./middlewares/errorMiddleware";

import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

import { router as mainDirectoryRounter } from "./routes/mainDirectory";
import { router as TodoDirectoryRouter } from "./routes/subDirectory";
app.use("/directory", mainDirectoryRounter);
app.use("/todo-item", TodoDirectoryRouter);

app.use(errorHandle);

export default app;
