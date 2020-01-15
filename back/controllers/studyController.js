import {users, studies} from "../models"
import sequelize from "../models/index"

export const create_study = (req, res) => {
    const db = sequelize.studies
    console.log(db)
    db.findAll({})
    .then(study => {
        res.send(study)
    })
}