import {common_posts} from "../models"


export const post_save = function(req, res, next) {
    const {writer, content, board} = req.body;

    console.log(writer, content, board);
    common_posts.create_common_post({writer, content, board});
    res.send('create post');
};
