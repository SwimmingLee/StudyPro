
import express from "express"
import routes from "../routes"
import {auth_mail,notice_apply,result_apply} from "../stmp.js"

const emailRouter = express.Router();

emailRouter.post(routes.auth, auth_mail)
emailRouter.post(routes.notice_apply, notice_apply)
emailRouter.post(routes.result_apply, result_apply)


export default emailRouter;