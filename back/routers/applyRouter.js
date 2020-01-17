
import express from "express"
import routes from "../routes"
import {create_apply, delete_apply, update_apply, read_apply} from "../controllers/applyController"

const applyRouter = express.Router();

applyRouter.post(routes.apply, create_apply)
applyRouter.delete(routes.apply_detail, delete_apply)
applyRouter.put(routes.apply_detail, update_apply)
applyRouter.post(routes.apply_detail, read_apply)

export default applyRouter;