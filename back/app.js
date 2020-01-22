
//const express = require('express')
//babel을 까았더니 아래와 같은 코드가 실행이 되었따. 
// ES6부턴, import를 통해서 쓸 수 예쁘게 사용할 수 있다. 
import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import { localsMiddelWare } from "./middleware"
import dotenv from "dotenv"
import cors from "cors"
import passport from "passport"
import bodyParser from "body-parser"
import userRouter from "./routers/userRouter"
import studyRouter from "./routers/studyRouter"
import workRouter from "./routers/workRouter"
import commentRouter from "./routers/commentRouter"
import postRouter from "./routers/postRouter"
import applyRouter from "./routers/applyRouter"
import alarmRouter from "./routers/alarmRouter"
import routes from "./routes"
import passportConfig from "./passport"


const app = express()
dotenv.config();


app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet()); // 보안을 위한 것이다. 
app.use(morgan("dev"));
app.use(passport.initialize());

app.use(localsMiddelWare)
app.use(routes.users, userRouter);
app.use(routes.studies, studyRouter);
app.use(routes.comments, commentRouter);
app.use(routes.posts, postRouter);
app.use(routes.works, workRouter);
app.use(routes.applies, applyRouter);
app.use(routes.alarms, alarmRouter);


export default app;

