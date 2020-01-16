import {users, studies, users_and_studies} from "../models"

// 
export const create_study = async function(req, res) {
    const name = req.body.name
    if (req.body.days) {
        // day모델에 추가하는 과정
    }

    const study = await studies.findOne({where: {name}})
    if (study) {
        res.send("이미 존재하는 스터디 이름입니다")
    } else {
        //body에서 days 부분빼는 과정
        studies.create(req.body)
        res.send(`${name}이 생성되었습니다.`)
    }
}

export const join_study = async function(req, res) {
    const user_id = req.body.user_id
    const study_id = req.body.study_id
    let wrong_id = false

    const user = await users.findOne({where:{id:user_id}})
    const study = await studies.findOne({where:{id:study_id}})
    if (!user || !study) {wrong_id = true}

    const user_study = await users_and_studies.findOne({
        where: {user_id, study_id}
    })
    if (!user_study) {
        if (wrong_id) {
            throw new Error("Wrong ID");
        } else {
            users_and_studies.create({
                user_id: user_id,
                study_id: study_id,
            })
        }
        res.send(`${user["dataValues"].name} 유저가 ${study["dataValues"].name} 스터디에 가입하였습니다.`)        
    }
    else {res.send("이미 가입한 스터디 입니다")} 
}

export const delete_study = async function(req, res) {
    const study_id = req.body.study_id

    const study = await studies.findOne({where:{id: study_id}})
    if (!study) {
        res.send("Wrong ID")
    } else {

        studies.destroy({where: {id:study_id}})
        res.send(`${study_id}번 스터디 삭제완료`)
    }
}

export const update_study = async function(req, res) {
    const study_id =  req.params.study_id

    const study = await studies.findOne({where:{id: study_id}})
    if (!study) {
        res.send("Wrong ID")
    } else {
        studies.update(req.body, {where: {id:study_id}})
        res.send(`${study_id}번 스터디 변경완료`)
    }
}
