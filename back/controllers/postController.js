import {common_posts as common_post_model, common_post_likes as common_post_like_model} from "../models"
import {study_posts as study_post_model, study_post_likes as study_post_like_model} from "../models"

import {Op} from "sequelize";

export const create_common_post = async function(req, res) {
    try{
        const {writer, title, content, board} = req.body;
        let result;
        result = await common_post_model.create_common_post(writer, title, content, board);
        res.send(result);
    }catch(error){
        res.send('error');
    }
}

export const read_common_post = async function(req, res) {
    const {post_id} = req.params.id;
    const {user_id} = req.body;
    
    let result = await common_post_model.read_common_post(post_id)
    
    // const like = await common_post_likes.findOne(
    //     {where:{
    //         [Op.and]: [
    //             { common_post_id: Number(post_id) },
    //             { user_id: Number(user_id) }]
    //         }
    //     }
    // );


    // if (like == null) {
    //     res.send({post, like:0});
    // }
    // else {
    //     res.json({post, like:1});
    // }
    return result;


}