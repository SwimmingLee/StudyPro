import {applies, users, studies} from "../models"

export const create_apply = async function(req, res) {
    let data = req.body
    data.user_id = res.local.user.id
    const study = await studies.findOne({where:{id:req.body.study_id}})
    const wrong_id = !study

    const result = await applies.create_apply(wrong_id, data)
    res.send(result)
}

export const delete_apply = async function(req, res) {  
    const apply_id = req.query.apply_id
    const result = await applies.delete_apply(apply_id, res.local.user.id)
    res.send(result)
}

export const update_apply = async function(req, res) {
    const apply_id = req.query.apply_id

    const result = await applies.update_apply(apply_id, req.body, res.local.user.id)
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
        const user = res.local.user;

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