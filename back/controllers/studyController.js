import {users, studies, users_and_studies, applies, days, tags, studies_and_tags, marked_studies, minor_classes} from "../models"
import multer from "multer"
import path from "path"

const study_image_default = function () {
    return ("study_default"  + (Math.round(Math.random() * 2) + 1) + ".png")
}

export const create_study = async function(req, res) {
    const captain = res.locals.user;
    const {
        name, goal, description, minor_class_id, user_limit,
        start_day, end_day, start_time, end_time, isOpen, status, progress_days, input_tags
    } = req.body;

    const study = await studies.findOne({where:{name}})
    if (study) {
        res.send({state:"fail", detail:"study name exist"})
    } else {
        const filename = (typeof req.file === 'undefined') ? study_image_default() : req.file.filename
        // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", req.body)
        const new_study = await studies.create({
            name, goal, description, minor_class_id, user_limit, captain:captain.id,
            start_date:start_day, end_date:end_day, start_time, end_time, isopen:(isOpen === 'true' ? 1: 0), status, 
            image_url: process.env.IMAGE_URL + filename,
        }).then(study => {
            const study_id = study.dataValues.id
            users_and_studies.create({user_id:captain.id, study_id})
            days.create_days(study_id, progress_days)
    
            return study
        }).then(async (study)=> {
            if (typeof input_tags === 'undefined') {
                res.send({state:"success", gid:study.dataValues.id})
            } else {
                for (const tag of input_tags) {
                    const temp_tag = await tags.findOne({where :{name:tag}})
                    if (temp_tag) {
                        studies_and_tags.create_study_tag(study_id, temp_tag.id)
                    }
                    else {
                        const created_tag = await tags.create_tag(tag)
                        studies_and_tags.create_study_tag(study_id, created_tag.id)
                    }
                }
                res.send({state:"success", gid:study.dataValues.id})
            }
        })
    }
}

export const apply_study = async function(req, res) {
    try{
        const user = res.locals.user;
        const {study_id, comment} = req.body

        const study = await studies.findOne({where:{id:study_id}})
        if (study && user) {
            const apply = await applies.create({study_id, user_id:user.id, comment:comment})
            if (apply) {
                res.send({state:"success"})
            } else {
                res.send({state:"fail"})
            }
        } else {
            res.send({state:"fail"})
        }
    } catch(err) {
        res.send(err)
    }
}

export const join_study = async function(req, res) {
    const {apply_id, accept} = req.body

    const apply = await applies.findOne({where:{id:apply_id}})
    if (apply) {
        const user_id = apply.dataValues.user_id;
        const study_id = apply.dataValues.study_id;
        if (apply.dataValues.accept) {
            const join = await users_and_studies.findOrCreate({user_id, study_id})
            if (join) {
                res.send({state:"success"})
            } else {
                res.send({state:"fail"})
            }
        } else { 
            res.send({state:"success"})
        }
        apply.destroy();
    } else {
        res.send({state:"fail"})
    }
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

export const study_image_upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, process.env.IMAGE_PATH);
        }, 
        filename: function(req, file, cb) {
            cb(null , new Date().valueOf() + path.extname(file.originalname));
        }
    })
});
