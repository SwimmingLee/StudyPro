import {applies, users, studies} from "../models"

export const create_apply = async function(req, res) {
    const user_id = res.locals.user ? res.locals.user.id : -1
    let data = req.body
    data.user_id = user_id
    const user = await users.findOne({where:{id:user_id}})
    const study = await studies.findOne({where:{id:req.body.study_id}})
    const wrong_id = !user || !study

    const result = await applies.create_apply(wrong_id, data)
    res.send(result)
}

export const delete_apply = async function(req, res) {
    const apply_id = req.query.apply_id
    const user_id = res.locals.user ? res.locals.user.id : -1
    const result = await applies.delete_apply(apply_id, user_id)
    res.send(result)
}

export const update_apply = async function(req, res) {
    const apply_id = req.query.apply_id
    const user_id = res.locals.user ? res.locals.user.id : -1

    
    const result = await applies.update_apply(apply_id, req.body, user_id)
    res.send(result)
}

export const read_apply = async function(req, res) {
    const apply_id = req.query.apply_id

    const result = await applies.read_apply(apply_id)
    if (!result) {
        res.send("없는 지원입니다")
    }
    else {
        const study = await studies.findOne({where:{id:result.study_id}})
        const user = await users.findOne({where:{id:result.user_id}})

        delete user.dataValues.password
        delete user.dataValues.auth
        delete user.dataValues.id
        delete study.dataValues.id

        result.dataValues.study = study
        result.dataValues.user = user
        
        delete result.dataValues.study_id
        delete result.dataValues.user_id

        res.send(result)
    }
}