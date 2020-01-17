import {users, studies, users_and_studies, applies} from "../models"

// 
export const create_study = async function(req, res) {
    const data = req.body
    const user = await users.findOne({where:{id: data.captain}})
    const wrong_id = !user
    if (data.days) {
        // day모델에 추가하는 과정
    }
    if (data.tags) {
        // tag모델에 추가하는 과정
    }
    const result = await studies.create_study(wrong_id, data)
    if (typeof result == "string") {res.send(result)}
    else {
        users_and_studies.join_to_study(data.captain, result[1].id, false, false)
        res.send(result[0])
    }
}

export const join_study = async function(req, res) {
    const user_id = req.body.user_id
    const study_id = req.params.study_id

    const user = await users.findOne({where:{id:user_id}})
    const study = await studies.findOne({where:{id:study_id}})
    const wrong_id = !user || !study

    const already_join = await users_and_studies.findOne({
        where: {user_id, study_id}
    })

    const result = await users_and_studies.join_to_study(user_id, study_id, wrong_id, already_join)
    res.send(result)
}

export const delete_study = async function(req, res) {
    const study_id = req.params.study_id

    const result = await studies.delete_study(study_id)
    res.send(result)

}

export const update_study = async function(req, res) {
    const study_id =  req.params.study_id

    const result = await studies.update_study(study_id, req.body)
    res.send(result)
}

export const read_study = async function(req, res) {
    const study_id =  req.params.study_id

    const result = await studies.read_study(study_id)
    const study_applies = await applies.findAll({where:{study_id}})
    const study_users_links = await users_and_studies.findAll({where:{study_id}})
    let study_users = []
    let link
    let temp_user

    for (link of study_users_links) {
        temp_user = await users.findOne({where:{id: link.user_id}})
        delete temp_user.dataValues.password
        delete temp_user.dataValues.auth
        study_users.push(temp_user)
    }

    result.dataValues.applies = study_applies
    result.dataValues.users = study_users

    res.send(result)
}

export const search_studies = async function(req, res) {
    const searching_captain = await users.findOne({where:{name: req.body.captain}})
    let searching_captain_id = searching_captain ? searching_captain.id : -1
    // if (searching_captain) {searching_captain_id = searching_captain.id}

    const result = await studies.search_studies(req.body, searching_captain_id)
    let study
    let captain
    for (study of result) {
        captain = await users.findOne({where:{id:study.dataValues.captain}})
        
        delete captain.dataValues.password
        delete captain.dataValues.auth
        delete study.dataValues.captain

        study.dataValues.captain = captain
    }

    res.send(result)
}