import express from "express"
import routes from "../routes"
import {create_study, join_study} from "../controllers/studyController"

const studyRouter = express.Router();


studyRouter.post(routes.create_study, create_study)
studyRouter.post(routes.join_study, join_study)

export default studyRouter;