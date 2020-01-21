import {common_posts as common_post_model, common_post_likes as common_post_like_model} from "../models"
import {study_posts as study_post_model, study_post_likes as study_post_like_model} from "../models"


export const create_post = async function(req, res) {
    try{
        const {writer, title, content, board} = req.body;
        let result;
        result = await common_post_model.create_common_post(writer, title, content, board);
        res.send(result);
    }catch(error){
        res.send('error');
    }
}

export const read_post = async function(req, res) {
    try{

        const {post_id} = req.params;
        const {user_id} = req.body;
        let result = await common_post_model.read_common_post(post_id)
        if(user_id){
            let like = common_post_like_model.read_like(post_id,user_id);
            if(like){
                result.like = true;
            }
        }
        res.send(result);
    }catch(error){
        res.send("error");
    }
}

export const update_post = async function(req, res) {
    try{
        const {post_id, title, content} = req.body;
        let result = await common_post_model.update_common_post(post_id, title, content)
        res.send("update ok");
    }catch(error){
        res.send("error");
    }
}

export const delete_post = async function(req, res) {
    try{
        const {post_id} = req.params;
        let result = await common_post_model.delete_common_post(post_id)
        res.send("delete ok");
    }catch(error){
        res.send("error");
    }
}

export const list_post = async function(req, res) {
    try{

        const {board} = req.params;
        let result = await common_post_model.list_common_post(board)
        res.send(result);
    }catch(error){
        res.send("error");
    }
}



export const create_study_post = async function(req, res) {
    try{
        const {study_id,writer, title, content, board} = req.body;
        let result;
        result = await study_post_model.create_study_post(study_id,writer, title, content, board);
        res.send(result);
    }catch(error){
        res.send('error');
    }
}

export const read_study_post = async function(req, res) {
    try{

        const {study_id,post_id} = req.params;
        const {user_id} = req.body;
        let result = await study_post_model.read_study_post(study_id,post_id)
        if(user_id){
            let like = study_post_like_model.read_like(post_id,user_id);
            if(like){
                result.like = true;
            }
        }
        res.send(result);
    }catch(error){
        res.send("error");
    }
}

export const update_study_post = async function(req, res) {
    try{
        const {post_id, title, content} = req.body;
        let result = await study_post_model.update_study_post(post_id, title, content)
        res.send("update ok");
    }catch(error){
        res.send("error");
    }
}

export const delete_study_post = async function(req, res) {
    try{
        const {post_id} = req.params;
        let result = await study_post_model.delete_study_post(post_id)
        res.send("delete ok");
    }catch(error){
        res.send("error");
    }
}

export const list_study_post = async function(req, res) {
    try{

        const {board} = req.params;
        let result = await study_post_model.list_study_post(board)
        res.send(result);
    }catch(error){
        res.send(error);
    }
}

