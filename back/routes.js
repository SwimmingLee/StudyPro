
// User
const USERS  = "/users";
const USER_DETAIL = "/:id";
const CHANGE_PASSWARD = "/change-password";
const SIGNUP = "/signup";
const SIGNIN = "/signin";

// Study
const STUDYS = "/studys";
const CREATE_STIDY = "/create";
const JOIN_STUDY = "/join"
const DELETE_STUDY = "/delete"
const UPDATE_STUDY = "/update/:study_id"

// Common Post
const COMMON_POSTS = "/common_post";
const READ_COMMON_POST = "/read";
const CREATE_COMMON_POST = "/create";
const DELETE_COMMON_POST = "/delete";
const UPDATE_COMMON_POST = "/update";

// Comments
const COMMENTS = "/comment";
const READ_COMMENT = "/read_comment";
const CREATE_COMMENT = "/create_comment";
const UPDATE_COMMENT = "/update_comment/:id";
const DELETE_COMMENT = "/delete_comment/:id";


const routes = {
    users : USERS,
    userDetail : USER_DETAIL,
    changePassword : CHANGE_PASSWARD,
    signup : SIGNUP,
    signin : SIGNIN,

    studys : STUDYS,
    create_study : CREATE_STIDY,
    join_study: JOIN_STUDY,
    delete_study: DELETE_STUDY,
    update_study: UPDATE_STUDY,

    common_posts : COMMON_POSTS,
    read_common_post : READ_COMMON_POST,
    create_common_post : CREATE_COMMON_POST,
    delete_common_post : DELETE_COMMON_POST,
    update_common_post : UPDATE_COMMON_POST,

    comments : COMMENTS,
    read_comment : READ_COMMENT,
    create_comment : CREATE_COMMENT,
    update_comment : UPDATE_COMMENT,
    delete_comment : DELETE_COMMENT
}

export default routes;