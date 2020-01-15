import Sequelize from "sequelize"
import fs from "fs"
import path from "path"

const config = require("../config/config.json")
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

module.exports = db