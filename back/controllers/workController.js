import {study_works, personal_works, users, studies} from "../models"

//req.body.study가 1이면 스터디 일정, 0이면 개인 일정

export const create_work = async function(req, res) {
    try{
        const writer = res.locals.user;
        const {name, content, dates, group, type, study_id, color, start_time, end_time,status} = req.body.payload;
        
        const user_info = await users.findOne({where: {id:writer}})
        const study_info = await this.findOne({where:{id: study_id}})
        let user_nickname = user_info.nickname;
        let study_name = study_info.name;

        let merged_date = '';
        for (let index = 0; index < dates.length-1; index++) {
            merged_date += dates[index]+"/";
        }
        merged_date += dates[dates.length-1];
        
        const works = (type === 'study') ? study_works : personal_works
        const work = await works.create({writer:writer.id, study_id, name, content, dates : merged_date, group, color, start_time, end_time,status, user_nickname,study_name })
        res.send({state:'success'})
    
    } catch (err) {
        res.send({state:'fail'})
    }
}

export const read_work = async function(req, res) {
    try{
        
        const writer = res.locals.user;
        const {type, study_id} = req.query;
        const works = (type === 'study') ? study_works : personal_works

        if (type === "personal") {
            const work = await works.findAll({where:{writer:writer.id}})
            res.send(work)
        } else {
            const work = await works.findAll({where:{study_id}})
            res.send(work)
        }
    } catch(err) {
        res.send(err)
    }
}
        

export const delete_work = async function(req, res) {
    try{
        const writer = res.locals.user;
        const {type, work_id} = req.body;
        const works = (type === 'study') ? study_works : personal_works
        
        const result = await works.destroy({where:{id:work_id}});
        res.send(result);
    } catch (err) {
        res.send(err)
    }
}

export const update_work = async function(req, res) {
    try{
        const writer = res.locals.user;
        const {type, work_id, name, content, start_date, end_date, group, color} = req.body;
        const works = (type === 'study') ? study_works : personal_works

        console.log("AAAAAAAAAAAAA")
        console.log(req.body)
        const result = await works.update({name, content, start_date, end_date, status:group, color}, {where:{id:work_id}});
        res.send(result);
    } catch(err) {

    }
}
