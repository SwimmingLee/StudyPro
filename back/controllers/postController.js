import {common_posts as common_post_model, common_post_likes as common_post_like_model} from "../models"
import {study_posts as study_post_model, study_post_likes as study_post_like_model} from "../models"
import {users} from "../models"

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

export const toggle_like = async function(req, res) {
    try{
        const user = res.locals.user
        const {post_id, type} = req.body;
        

        if(type === "common"){
            const like = await common_post_like_model.findOne( {where: {common_post_id:post_id, user_id:user.id}});
        }else if(type === "study" && user){
            const like = await study_post_like_model.findOne( {where: {study_post_id:post_id, user_id:user.id}});
            if (like) {
                like.destroy();
                res.send({like: false})
            } else {
                study_post_like_model.create({study_post_id:post_id, user_id:user.id});
                res.send({like: true})
            }
        }
    }catch(error){
        console.log(error);
    }
}



export const read_post = async function(req, res) {
    try{
        const {post_id, type} = req.query;
        const user = res.locals.user

        let result;
        let like = false;
        if(type === "common"){
            result = await common_post_model.read_common_post(post_id)
        }else if(type === "study"){
            result = await study_post_model.read_study_post(post_id)
            .then(async (post) => {
                const writer = await users.findOne( {where: {id:post.writer}})
                post.dataValues.writer = writer.dataValues.nickname
                
                if (user) {
                    const post_like = await study_post_like_model.findOne( {where: {study_post_id:post_id, user_id:user.id}});
                    post.dataValues.like = post_like ? true : false
                }

                const post_num_like = await study_post_like_model.count( {where: {study_post_id:post_id, user_id:user.id}});
                post.dataValues.num_like = post_num_like

                return post;
            }).then(post => {
                res.send(post)
            })
            
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
        console.log(req.body)
        if(type ==="common"){
            const post = await common_post_model.fineOne({where: {id:post_id}})
            post.destroy();
        }else if( type === "study"){
            const post = await study_post_model.destroy({where: {id:post_id}})
            if (post === '1') {
                res.send({state: "success"});
            } else {
                res.send({state: "fail"})
            }
        }
    } catch (error){
        res.send("error");
    }
}


export const list_post = async function(req, res) {
    try{
        const {board, type, study_id, offset} = req.query;
        console.log(board, type, study_id, offset);
        let result;
        if(type === "common"){
            common_post_model.findAll({ 
                offset: Number(offset || 0),
                limit: 10,
                where : {
                    study_id : study_id,
                    board : board,
                },
                order:  [['id','DESC']]
            }).map(async (post) => {
                const writer_id = post.dataValues.writer
                const writer = await users.findOne({where:{id:writer_id}})
                post.dataValues.writer = writer.dataValues.nickname

                const post_num_like = await study_post_like_model.count( {where: {study_post_id:post_id}});
                post.dataValues.num_like = post_num_like

                return post
            }).then((posts)=>{
                res.send(posts)
            })
        }else if(type === "study"){
            study_post_model.findAll({ 
                offset: Number(offset || 0),
                limit: 10,
                where : {
                    study_id : study_id,
                    board : board,
                },
                order:  [['id','DESC']]
            }).map(async (post) => {
                const writer_id = post.dataValues.writer
                const user = await users.findOne({where:{id:writer_id}})
                post.dataValues.writer = user.dataValues.nickname
                return post
            }).then((posts)=>{
                res.send(posts)
            })
        }
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