import {alarms, users} from "../models"

export const create_alarm = async function(req, res) {
    const from = res.locals.user ? res.locals.user.id : -1
    const to = req.body.to ? req.body.to : -1

    const from_user = users.findOne({where:{id:from}})
    const to_user = users.findOne({where:{id:to}})

    const wrong_id = !from_user || !to_user

    if (wrong_id) {res.send({
        "state": "fail",
        "detail": "wrong id"
    })} else {
        
    }
}

export const delete_alarm = async function(req, res) {
    
} 

export const read_alarm = async function(req, res) {
    
}