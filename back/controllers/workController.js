import {study_works, personal_works, users, studies} from "../models"

//req.body.study가 1이면 스터디 일정, 0이면 개인 일정

export const create_work = async function(req, res) {
    const writer = res.locals.user;
    const {name, content, start_date, end_date, status, type, study_id} = req.body;
    const works = (type === 'study') ? study_works : personal_works
    
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log({name, content, start_date, end_date, status, type, study_id})
    console.log(req.body)

    const work = await works.create({writer:writer.id, study_id, name, content, start_date, end_date, status})
    res.send(work)
}

export const delete_work = async function(req, res) {
    const works = req.body.study === '1' ? study_works : personal_works;
    const user_id =  res.locals.user.id;

    const work_id = req.query.work_id;
    const result = await works.delete_work(work_id, user_id);

    res.send(result);
}

export const update_work = async function(req, res) {
    const works = req.body.study === '1' ? study_works : personal_works;
    const user_id = res.locals.user.id;

    const work_id = req.query.work_id;
    const data = req.body;

    const result = await works.update_work(work_id, data, user_id);
    res.send(result);
}

export const read_work = async function(req, res) {
    const writer = res.locals.user;
    const {type, study_id} = req.query;
    const works = (type === 'study') ? study_works : personal_works

    const work = await works.findAll({where:{writer:writer.id}})
    res.send(work)
        
}