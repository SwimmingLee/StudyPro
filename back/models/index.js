// import config from "../config/config"
const config = require("../config/config.json")
import Sequelize from "sequelize"
import USERS from "./users"
let d = config["development"]
let db = {}

let sequelize = new Sequelize(d.database, d.username, d.password, d)

db.sequelize = sequelize
db.Sequelize = Sequelize

db.USERS = USERS(sequelize, Sequelize)

module.exports = db