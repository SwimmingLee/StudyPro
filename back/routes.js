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

// Common Comments
const COMMON_COMMENTS = "/common_comments";
const COMMON_COMMENT = "/";
const COMMON_COMMENT_DETAIL = "/:common_commnet_id";

// Common Comments
const STUDY_COMMENTS = "/study_comments";
const STUDY_COMMENT = "/";
const STUDY_COMMENT_DETAIL = "/:study_commnet_id";


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

    common_comments : COMMON_COMMENTS,
    common_comment : COMMON_COMMENT,
    common_comment_detail : COMMON_COMMENT_DETAIL,

    study_comments : STUDY_COMMENTS,
    study_comment : STUDY_COMMENT,
    study_comment_detail : STUDY_COMMENT_DETAIL,

    works : WORKS,
    work : WORK,
    work_detail : WORK_DETAIL,
    
    applies : APPLIES,
    apply : APPLY,
    apply_detail : APPLY_DETAIL,

}

export default routes;