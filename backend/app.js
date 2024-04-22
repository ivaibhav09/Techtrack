import express from "express";
import {config} from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import internshipRouter from "./routes/internshipRouter.js"
import applicationRouter from "./routes/applicationRouter.js";
import jobRouter from "./routes/jobRouter.js";
import {dbConnection} from './database/dbConnection.js';
import { errorMiddleware } from "./middlewares/error.js";


const app = express();

config({path: "./config/config.env"});

app.use(
    cors({
        origin: 'http://localhost:5173',
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
}))

app.use('/api/v1/user', userRouter);
app.use('/api/v1/application', applicationRouter);
app.use('/api/v1/job', jobRouter);
app.use('/api/v1/internship', internshipRouter);
app.use(errorMiddleware);

dbConnection();
export default app;