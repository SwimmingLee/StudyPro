
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

const routes = {
    users : USERS,
    userDetail : USER_DETAIL,
    changePassword : CHANGE_PASSWARD,
    signup : SIGNUP,
    signin : SIGNIN,

    studys : STUDYS,
    create_study : CREATE_STIDY,
    join_study: JOIN_STUDY,
}

export default routes;