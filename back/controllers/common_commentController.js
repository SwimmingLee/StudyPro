import {comments  } from "../models"

import {comment as comment_model} from "../models/common_comments"
import {users as user_model} from "../models/users"


export const create_comment = async function(req, res){
    try{
        const {user_id, post_id, content } = req.body;
        console.log(user_id, post_id, content);
        let result = await comment_model.create_comment(user_id, post_id, content);
        res.send('result');
    }catch(error){
        res.send('error')
    }
}



