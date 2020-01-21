import {common_posts, common_post_likes, comments} from "../models"
import {Op} from "sequelize";

export const create_post = function(req, res, next) {
    const {writer, content, board} = req.body;

    //console.log(writer, content, board);
    common_posts.create_common_post({writer, content, board});
    res.send('create post');
};

export const read_post = async function(req, res) {
    const {post_id} = req.params;
    console.log(req.params);
    const {user_id} = req.body;

    const post = await common_posts.findOne({where:{id:Number(post_id)}});
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