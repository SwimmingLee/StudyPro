import express from "express"
import routes from "../routes"
import {create_study} from "../controllers/studyController"

const studyRouter = express.Router();


studyRouter.get(routes.create_study, create_study)

export default studyRouter;