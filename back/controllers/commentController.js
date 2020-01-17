
import {common_comments as common_comment_model} from "../models"
import {study_comments as study_comment_model} from "../models"


export const create_comment = async function(req, res){
    try{
       const {user_id, post_id, content, post_type} = req.body;
       
       let result;
       if(post_type ==="common"){
           result = await common_comment_model.create_comment(user_id, post_id, content);
       }else{
           result = await study_comment_model.create_comment(user_id, post_id , content);
       }
        res.send("create ok");
    }catch(error){
        res.send('error')
    }
}


export const read_comments = async function(req, res){
    try{
        const {post_id, post_type} = req.body;
        let result;
        if(post_type === "common"){
            result = await common_comment_model.read_comment(post_id);
        }else{
            result = await study_comment_model.read_comment(post_id);
        }
        res.send(result);
    
    }catch(error){
        console.log(error);
        res.send('error')
    }
}

export const update_comment = async function(req, res){
    try{
        const {comment_id, content, post_type} = req.body;
        let result;
        if(post_type === "common"){
            result = await common_comment_model.update_comment(comment_id, content);
        }else{
            result = await study_comment_model.update_comment(comment_id, content);
        }
        res.send("update ok");
    
    }catch(error){
        console.log(error);
        res.send('error')
    }
}

export const delete_comment = async function(req, res){
    try{
        const {comment_id, post_type} = req.body;
        let result;
        if(post_type === "common"){
            result = await common_comment_model.delete_comment(comment_id);
        }else{
            result = await study_comment_model.delete_comment(comment_id);
        }
        res.send("delete ok");
    
    }catch(error){
        console.log(error);
        res.send('error')
    }
}



