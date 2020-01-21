import {common_posts as common_post_model, common_post_likes as common_post_like_model, comments} from "../models"
import {study_posts as study_post_model, study_post_likes as study_post_like_model} from "../models"

import {Op} from "sequelize";

export const create_post = async function(req, res, next) {
    
    try{
        const {writer, content, board, post_type} = req.body;
        let result;
        if(post_type === "common"){
            result = common_post_model.create_common_post(writer, content, board);
        }else{
            result = study_post_model.create_study_post(writer, content, board);
        }
        res.send(result);
    }catch(error){
        res.send('error');
    }
};

export const read_post = async function(req, res) {
    const {post_id} = req.params;
    console.log(req.params);
    const {user_id} = req.body;


    
    const post = await common_post_model.findOne({where:{id:Number(post_id)}});
    
    
    const like = await common_post_likes.findOne(
        {where:{
            [Op.and]: [
                { common_post_id: Number(post_id) },
                { user_id: Number(user_id) }]
            }
        }
    );


    if (like == null) {
        res.send({post, like:0});
    }
    else {
        res.json({post, like:1});
    }
    
};