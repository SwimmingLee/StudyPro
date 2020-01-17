// User
const USERS  = "/users";
const USER_DETAIL = "/:user_id";
const CHANGE_PASSWARD = "/change-password";
const SIGNUP = "/signup";
const SIGNIN = "/signin";

// Study
const STUDIES = "/studies";
const STUDY = "/";
const STUDY_DETAIL = "/:study_id";

// Common Post
const COMMON_POSTS = "/common_posts";
const COMMON_POST = "/";
const COMMON_POST_DETAIL = "/:post_id";

// Comments
const COMMENTS = "/comments";
const COMMENT = "/";
const COMMENT_DETAIL = "/:commnet_id";

// Works
const WORKS = "/works";
const WORK = "/";
const WORK_DETAIL = "/:work_id";

// Applies
const APPLIES = "/applies";
const APPLY = "/";
const APPLY_DETAIL = "/:apply_id";

const routes = {
    users : USERS,
    userDetail : USER_DETAIL,
    changePassword : CHANGE_PASSWARD,
    signup : SIGNUP,
    signin : SIGNIN,

    studies : STUDIES,
    study : STUDY,
    study_detail : STUDY_DETAIL,

    common_posts : COMMON_POSTS,
    common_post : COMMON_POST,
    common_post_detail : COMMON_POST_DETAIL,

    comments : COMMENTS,
    comment : COMMENT,
    comment_detail : COMMENT_DETAIL,

    works : WORKS,
    work : WORK,
    work_detail : WORK_DETAIL,
    
    applies : APPLIES,
    apply : APPLY,
    apply_detail : APPLY_DETAIL,

}

export default routes;