
import express from "express"
import routes from "../routes"
import {create_apply, delete_apply, update_apply, read_applies} from "../controllers/applyController"

const applyRouter = express.Router();

applyRouter.post(routes.create_apply, create_apply)
applyRouter.delete(routes.delete_apply, delete_apply)
applyRouter.put(routes.update_apply, update_apply)
applyRouter.post(routes.read_applies, read_applies)

export default applyRouter;