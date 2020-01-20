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

export const update_common_post = async function(req, res) {
    try{
        const {post_id, title, content} = req.body;
        let result = await common_post_model.update_common_post(post_id, title, content)
        res.send("update ok");
    }catch(error){
        res.send("error");
    }
}

export const delete_common_post = async function(req, res) {
    try{
        const {post_id} = req.params;
        let result = await common_post_model.delete_common_post(post_id)
        res.send("delete ok");
    }catch(error){
        res.send("error");
    }
}

export const list_common_post = async function(req, res) {
    try{

        const {board} = req.params;
        let result = await common_post_model.list_common_post(board)
        res.send(result);
    }catch(error){
        res.send("error");
    }
}

