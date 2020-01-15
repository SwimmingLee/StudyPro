import {users, studies, users_and_studies} from "../models"


export const create_study = (req, res) => {
    const name = req.body.name
    
    studies.findAll({
        where: {
            name
        }
    })
    .then(result => {
        if (result.length) {
            res.send("이미 존재하는 스터디 이름입니다")
        } else {
            studies.create(req.body)
            res.send(`${name}이 생성되었습니다.`)
        }
    })
}

export const join_study = (req, res) => {
    const user_id = req.body.user_id
    const study_id = req.body.study_id
    users_and_studies.findOne({
        
    })
}