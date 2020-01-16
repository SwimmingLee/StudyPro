
// User
const USERS  = "/users";
const USER_DETAIL = "/:id";
const CHANGE_PASSWARD = "/change-password";
const SIGNUP = "/signup";
const SIGNIN = "/signin";

// Study
const STUDYS = "/studys";
const CREATE_STIDY = "/create";
const JOIN_STUDY = "/join";
const DELETE_STUDY = "/delete";
const UPDATE_STUDY = "/update/:study_id";

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

// Works
const WORKS = "/works";
const CREATE_WORK = "/create";
const DELETE_WORK = "/delete/:work_id";
const UPDATE_WORK = "/update/:work_id";
const READ_WORKS = "/read";

// Applies
const APPLIES = "/apply";
const CREATE_APPLY = "/create";
const DELETE_APPLY = "/delete/:apply_id";
const UPDATE_APPLY = "/update/:apply_id";
const READ_APPLIES = "/read";

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
    delete_comment : DELETE_COMMENT,

    works : WORKS,
    create_work : CREATE_WORK,
    delete_work : DELETE_WORK,
    update_work : UPDATE_WORK,
    read_works : READ_WORKS,

    applies : APPLIES,
    create_apply : CREATE_APPLY,
    delete_apply : DELETE_APPLY,
    update_apply : UPDATE_APPLY,
    read_applies : READ_APPLIES,
}

export default routes;