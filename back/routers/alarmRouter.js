
import express from "express"
import routes from "../routes"
import {create_alarm, delete_alarm, read_alarm, read_alarms_all} from "../controllers/alarmController"

const alarmRouter = express.Router();

alarmRouter.post(routes.alarm, create_alarm)
alarmRouter.delete(routes.alarm_detail, delete_alarm)
alarmRouter.get(routes.alarm_detail, read_alarm)
alarmRouter.get(routes.alarms, read_alarms_all)

export default alarmRouter;