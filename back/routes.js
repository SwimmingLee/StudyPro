// User
const USERS  = "/users";
const USER_DETAIL = "/:user_id";
const CHANGE_PASSWARD = "/change-password";
const SIGNUP = "/signup";
const SIGNIN = "/signin";

// Study
const STUDIES = "/studies";
const STUDY = "/";
const STUDY_SEARCH = "/search";
const STUDY_MARK = "/mark";
const STUDY_DETAIL = "/:study_id";

// Common Post
const POSTS = "/posts";
const POST = "/post";
const POST_DETAIL = "/:post_id";

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

// Alarms
const ALARMS = "/alarms";
const ALARM = "/";
const ALARM_DETAIL = "/:alarm_id";

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
    study_mark : STUDY_MARK,

    posts : POSTS,
    post : POST,
    post_detail : POST_DETAIL,

    comments : COMMENTS,
    comment : COMMENT,
    comment_like: COMMENT_like,

    works : WORKS,
    work : WORK,
    work_detail : WORK_DETAIL,
    
    applies : APPLIES,
    apply : APPLY,
    apply_detail : APPLY_DETAIL,

    alarms : ALARMS,
    alarm : ALARM,
    alarm_detail : ALARM_DETAIL,

}

export default routes;