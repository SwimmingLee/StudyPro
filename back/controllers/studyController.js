import {users, studies, users_and_studies} from "../models"

// 
export const create_study = async function(req, res) {
    const data = req.body
    if (data.days) {
        // day모델에 추가하는 과정
    }
    if (data.tags) {
        // tag모델에 추가하는 과정
    }
    const result = await studies.create_study(data)
    res.send(result)
}

export const join_study = async function(req, res) {
    const user_id = req.body.user_id
    const study_id = req.body.study_id
    let wrong_id = false

    const user = await users.findOne({where:{id:user_id}})
    const study = await studies.findOne({where:{id:study_id}})
    if (!user || !study) {wrong_id = true}

    const already_join = await users_and_studies.findOne({
        where: {user_id, study_id}
    })

    const result = await users_and_studies.join_to_study(user_id, study_id, wrong_id, already_join)
    res.send(result)
}

export const delete_study = async function(req, res) {
    const study_id = req.body.study_id

    const result = await studies.delete_study(study_id)
    res.send(result)

}

export const update_study = async function(req, res) {
    const study_id =  req.params.study_id
    const data = req.body
    const result = await studies.update_study(study_id, data)
    res.send(result)
}
