// import config from "../config/config"
const config = require("../config/config.json")
import Sequelize from "sequelize"
import fs from "fs"
import path from "path"
const d = config["development"]
let db = {}

const sequelize = new Sequelize(d.database, d.username, d.password, d)

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize
db.Sequelize = Sequelize

// db.USERS = USERS(sequelize, Sequelize)
// db.STUDIES = STUDIES(sequelize, Sequelize)



module.exports = db