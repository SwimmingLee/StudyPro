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
const STUDY_SEARCH = "/search";

//Common Post
const COMMON_POSTS = "/common_posts";
//Study Post
const STUDY_POSTS = "/study_posts";

const POST = "/post"
const COMMON_POST = "/post/:board";
const STUDY_POST = "/post/:study_id&:board";
const COMMON_POST_DETAIL = "/detail/:post_id";
const STUDY_POST_DETAIL = "/detail/:study_id&:post_id";

// Comments
const COMMENTS = "/comments";
const COMMENT = "/comment";
const COMMENT_like = "/comment_like";


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
    study_search : STUDY_SEARCH,

    post : POST,
    common_posts : COMMON_POSTS,
    common_post : COMMON_POST,
    common_post_detail : COMMON_POST_DETAIL,
    study_posts : STUDY_POSTS,
    study_post : STUDY_POST,
    study_post_detail: STUDY_POST_DETAIL,

    comments : COMMENTS,
    comment : COMMENT,
    comment_like: COMMENT_like,

    works : WORKS,
    work : WORK,
    work_detail : WORK_DETAIL,
    
    applies : APPLIES,
    apply : APPLY,
    apply_detail : APPLY_DETAIL,

}

export default routes;