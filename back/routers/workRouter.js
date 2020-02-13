
import express from "express"
import routes from "../routes"
import {create_work, delete_work, update_work, read_work} from "../controllers/workController"


const workRouter = express.Router();

workRouter.post(routes.home, create_work);
workRouter.get(routes.home, read_work)
// workRouter.delete(routes.work_detail, delete_work);
// workRouter.put(routes.work_detail, update_work);

export default workRouter;