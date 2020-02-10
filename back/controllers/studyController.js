import {users, studies, users_and_studies, applies, days, tags, studies_and_tags, marked_studies, minor_classes} from "../models"

// 
export const create_study = async function(req, res) {
    const data = req.body;
    const user_id = res.locals.user.id;

    const wrong_id = user_id;
    const minor_class = await minor_classes.findOne({where:{name: data.minor_class}})
    
    let result
    if (!minor_class) {
        result = {
            state: "fail",
            detail: "소주제가 잘못되었습니다"
        }
    } else {
        delete data.minor_class
        data.minor_class_id = minor_class.id
        data.captain = user_id
        result = await studies.create_study(wrong_id, data)
    }

    if (result.state === "fail") {res.send(result)}
    else {
        const created_study_id = result.detail.id
        users_and_studies.join_to_study(data.captain, created_study_id, false, false)
        res.send(result)
        if (data.days) {
            // day모델에 추가하는 과정
            //const input_days = data.days.replace('[', '').replace(']', '').replace(/ /g,'').split(',')
            const input_days = data.days;
            days.create_days(created_study_id, input_days)
        }
        if (data.tags) {
            // tag모델에 추가하는 과정
            //const input_tags = data.tags.replace('[', '').replace(']', '').replace(/#/g, '').replace(/ /g,'').split(',')
            const input_tags = data.tags
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
    
    const user_id = res.locals.user.id;
    const study_id = req.query.study_id

    const study = await studies.findOne({where:{id:study_id}})
    const wrong_id = !study

    const already_join = await users_and_studies.findOne({
        where: {user_id, study_id}
    })

    const result = await users_and_studies.join_to_study(user_id, study_id, wrong_id, already_join)
    res.send(result)
}

export const delete_study = async function(req, res) {
    const study_id =  req.query.study_id
    const user_id = res.locals.user.id;

    const result = await studies.delete_study(study_id, user_id)
    res.send(result)

}

export const update_study = async function(req, res) {
    const study_id =  req.query.study_id
    const user_id = res.locals.user.id;

    const result = await studies.update_study(study_id, req.body, user_id)
    res.send(result)
}

export const read_studies = async function(req, res) {
    try{
        studies.findAll()
            .map(async study => {
                const minor =  await minor_classes.findOne({where:{id:study.dataValues.minor_class_id}});
                study.dataValues.minor_class = minor
                delete study.dataValues.minor_class_id

                const captain = await users.findOne({where:{id:study.dataValues.captain}})
                delete captain.dataValues.password
                delete captain.dataValues.auth
                study.dataValues.captain = captain.dataValues

                return study
            }).then(studies => {
                res.send(studies)
            })
    } catch(err) {

    }
}

export const read_study = async function(req, res) {
    
    const study_id =  req.query.study_id
    const user_id = res.locals.user.id;
    const result = await studies.read_study(study_id)
    const study_applies = await applies.findAll({where:{study_id}})
    const study_users_links = await users_and_studies.findAll({where:{study_id}})

    const is_liked = await marked_studies.findOne({where:{user_id, study_id}})
    const like = is_liked ? true : false

    let study_users = [], link, temp_user, is_joined = false  
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
    const searching_captain = req.body.captain ? await users.findOne({where:{name: req.body.captain}}) : undefined
    const searching_minor_class = req.body.minor_class ? await minor_classes.findOne({where:{name: req.body.minor_class}}) : undefined
    const searching_major_class = req.body.major_class ? await major_classes.findOne({where:{name: req.body.major_class}}) : undefined
    const searching_tag = req.body.tag ? await tags.findOne({where:{name: req.body.tag}}) : undefined
    const input_days = req.body.days ? req.body.days.replace('[', '').replace(']', '').replace(/ /g,'').split(',') : []


    const searching_captain_id = searching_captain ? searching_captain.id : -1
    const searching_minor_class_id = searching_minor_class ? searching_minor_class.id : -1
    const searching_major_class_id = searching_major_class ? searching_major_class.id : -1
    const searching_tag_id = searching_tag ? searching_tag.id : -1

    const user_id = req.body.user_id ? req.body.user_id : -1
    const id_data = {tag_id: searching_tag_id, captain_id : searching_captain_id, minor_class_id:searching_minor_class_id, major_class_id: searching_major_class_id}
    const temp_result = await studies.search_studies(req.body, id_data)
    const result = []
    let study, captain, like, is_joined, day, study_day, flag, study_tag
    for (study of temp_result) {
        flag = true
        captain = await users.findOne({where:{id:study.dataValues.captain}})
        like = await marked_studies.findOne({where:{user_id, study_id:study.dataValues.id}}) ? true : false
        is_joined = await users_and_studies.findOne({where:{user_id, study_id:study.dataValues.id}}) ? true : false

        delete captain.dataValues.password
        delete captain.dataValues.auth
        delete study.dataValues.captain

        study.dataValues.captain = captain
        study.dataValues.like = like
        study.dataValues.is_joined = is_joined

        for (day of input_days) {
            study_day = await days.findOne({where:{day, study_id: study.dataValues.id}})
            if (!study_day) flag = false
        }
        if (searching_tag) {
            study_tag = await studies_and_tags.findOne({where:{tag_id:searching_tag_id, study_id: study.dataValues.id}})
            if (!study_tag) flag = false
        }

        if (flag) result.push(study)
    }

    res.send(result)
}

export const mark_study = async function(req, res) {
    const study_id = req.query.study_id
    const user_id = res.locals.user.id;

    const result = await marked_studies.mark_study(user_id, study_id)
    res.send(result)
}

export const read_marked_studies = async function(req, res) {
    const user_id = res.locals.user.id;

    const markings = await marked_studies.findAll({where:{user_id}})
    let result = [], marking

    for (marking of markings) {
        const marked_study = await studies.read_study(marking.study_id)
        result.push(marked_study)
    }

    res.send(result)
}