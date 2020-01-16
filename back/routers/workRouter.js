
import express from "express"
import routes from "../routes"
import {create_work, delete_work, update_work, read_works} from "../controllers/workController"


const workRouter = express.Router();

workRouter.post(routes.create_work, create_work);
workRouter.delete(routes.delete_work, delete_work);
workRouter.put(routes.update_work, update_work);
workRouter.post(routes.read_works, read_works)

export default workRouter;