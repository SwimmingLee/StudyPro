import {common_posts as common_post_model, common_post_likes as common_post_like_model} from "../models"
import {study_posts as study_post_model, study_post_likes as study_post_like_model} from "../models"

export const number_post = async function(req, res) {
    try {
        const {board, type, study_id} = req.query;
        let nPost;

        if(type === "common"){
            nPost = await common_post_model.count({where:
                {
                    study_id : study_id,
                    board : board
                }
            })
        } else if (type === "study") {
            nPost = await study_post_model.count({where:
                {
                    study_id : study_id,
                    board : board
                }
            })
        }
        res.json({post_number: nPost})
    } catch (err) {
        console.log(err)
        res.send('err')
    }
}

export const create_post = async function(req, res) {
    try {
        const {study_id,writer, title, content, board, type} = req.body;
        
        let result;
        if (type === "common") {
            result = await common_post_model.create_common_post(writer, title, content, board);
        } else if (type === "study") {
            result = await study_post_model.create_study_post(study_id,writer, title, content, board);
        }
        res.send(result);
    } catch (error){
        console.log(error);
        res.send('error');
    }
}

export const read_like = async function(user_id, post_id,type) {
    try{
        
        let like;
        if(type === "common"){
            like = await common_post_like_model.read_like(post_id,user_id);
        }else if(type === "study"){
            like = await study_post_like_model.read_like(post_id,user_id);
        }
        if(like){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
    }
}



export const read_post = async function(req, res) {
    try{
        const {post_id, type} = req.query;
        let result, user_id;
        let like = false;
        
        if(type === "common"){
            result = await common_post_model.read_common_post(post_id)

        }else if(type === "study"){
            result = await study_post_model.read_study_post(post_id)
            res.send(result)
        }
        
        if (result) {
            user_id = res.locals.user.id;
            if (user_id) {
                like = await this.read_like(post_id,user_id,type);
            }
            result.like = like;
        }
        res.send(result);
        
    } catch(error){
        console.log(error);
        res.send("error");
    }
}

export const update_post = async function(req, res) {
    try{
        const {post_id, title, content, type} = req.body;
        let result;
        if(type === "common"){
            result = await common_post_model.update_common_post(post_id, title, content)
        }else if(type ==="study"){
            result = await study_post_model.update_study_post(post_id, title, content)
        }
        res.send("update ok");
    }catch(error){
        res.send("error");
    }
}

export const delete_post = async function(req, res) {
    try{
        const {post_id, type} = req.body;
        let result;
        if(type ==="common"){
            result = await common_post_model.delete_common_post(post_id)
        }else if( type === "study"){
            result = await study_post_model.delete_study_post(post_id)
        }
        res.send("delete ok");
    }catch(error){
        res.send("error");
    }
}

export const list_post = async function(req, res) {
    try{
        const {board, type, study_id, offset} = req.query;
        console.log(board, type, study_id, offset);
        let result;
        if(type === "common"){
            result = await common_post_model.list_common_post(board, offset || 0)
        }else if(type === "study"){
            result = await study_post_model.list_study_post(study_id,board, offset || 0)
        }
        res.send(result);
    }catch(error){
        console.log(error);
        
        res.send("error");
    }
}

export const search_post = async function(req, res) {
    try{
        
        const {type,subject,word,board,study_id} = req.body;
        console.log(board, type);
        let result;
        if(type === "common"){
            result = await common_post_model.search_common_post(board,subject,word)
        }else if(type === "study"){
            
            result = await study_post_model.search_study_post(study_id,board,subject, word)
        }
        res.send(result);
    }catch(error){
        console.log(error);
        
        res.send("error");
    }
}