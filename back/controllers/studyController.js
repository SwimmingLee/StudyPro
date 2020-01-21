import {users, studies, users_and_studies, applies, days, tags, studies_and_tags, marked_studies} from "../models"

// 
export const create_study = async function(req, res) {
    const data = req.body
    const user = await users.findOne({where:{id: data.captain}})
    const wrong_id = !user

    const result = await studies.create_study(wrong_id, data)
    
    if (result.state === "fail") {res.send(result)}
    else {
        const created_study_id = result.detail[1].id
        users_and_studies.join_to_study(data.captain, created_study_id, false, false)
        res.send(result.detail[0])
        if (data.days) {
            // day모델에 추가하는 과정
            const input_days = data.days.replace('[', '').replace(']', '').split(',')
            days.create_days(created_study_id, input_days)
        }
        if (data.tags) {
            // tag모델에 추가하는 과정
            const input_tags = data.tags.replace('[', '').replace(']', '').replace('#', '').replace(' ','').split(',')
            for (const tag of input_tags) {
                const temp_tag = await tags.findOne({where :{name:tag}})
                if (temp_tag) {
                    studies_and_tags.create_study_tag(created_study_id, temp_tag.id)
                }
                else {
                    const created_tag = await tags.create_tag(tag)
                    studies_and_tags.create_study_tag(created_study_id, created_tag.id)
                }
            }
        }
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
    const user_id = req.body.user_id ? req.body.user_id : -1
    const result = await studies.read_study(study_id)
    const study_applies = await applies.findAll({where:{study_id}})
    const study_users_links = await users_and_studies.findAll({where:{study_id}})
    let study_users = []
    let link, temp_user, is_joined = false
    const is_liked = await marked_studies.findOne({where:{user_id, study_id}})
    const like = is_liked ? true : false
    
    for (link of study_users_links) {
        temp_user = await users.findOne({where:{id: link.user_id}})
        delete temp_user.dataValues.password
        delete temp_user.dataValues.auth
        study_users.push(temp_user)

        if (link.user_id == user_id) is_joined = true;
    }
    result.dataValues.applies = study_applies
    result.dataValues.users = study_users
    result.dataValues.like = like
    result.dataValues.is_joined = is_joined

    res.send(result)
}

export const search_studies = async function(req, res) {
    const searching_captain = req.body.captain ? await users.findOne({where:{name: req.body.captain}}) : -1
    let searching_captain_id = searching_captain ? searching_captain.id : -1
    const user_id = req.body.user_id ? req.body.user_id : -1

    const result = await studies.search_studies(req.body, searching_captain_id)
    let study, captain, like, is_joined
    for (study of result) {
        captain = await users.findOne({where:{id:study.dataValues.captain}})
        like = await marked_studies.findOne({where:{user_id, study_id:study.dataValues.id}}) ? true : false
        is_joined = await users_and_studies.findOne({where:{user_id, study_id:study.dataValues.id}}) ? true : false
        delete captain.dataValues.password
        delete captain.dataValues.auth
        delete study.dataValues.captain

        study.dataValues.captain = captain
        study.dataValues.like = like
        study.dataValues.is_joined = is_joined

    }

    res.send(result)
}

export const mark_study = async function(req, res) {
    const study_id = req.body.study_id
    const user_id = req.body.user_id

    const result = await marked_studies.mark_study(user_id, study_id)
    res.send(result)
}

export const read_marked_studies = async function(req, res) {
    const user_id = req.body.user_id ? req.body.user_id : -1

    const markings = await marked_studies.findAll({where:{user_id}})
    let result = []

    for (let marking of markings) {
        const marked_study = await studies.read_study(marking.study_id)
        result.push(marked_study)
    }

    res.send(result)
}