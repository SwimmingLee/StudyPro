import express from "express"
import routes from "../routes"
import {create_study, join_study, delete_study, update_study} from "../controllers/studyController"

const studyRouter = express.Router();


studyRouter.post(routes.study, create_study)
studyRouter.post(routes.study_detail, join_study)
studyRouter.delete(routes.study_detail, delete_study)
studyRouter.put(routes.study_detail, update_study)

export default studyRouter;
