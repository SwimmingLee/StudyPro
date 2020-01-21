import routes from "./routes"
import jwt from "jsonwebtoken"
import {users} from "./models"

export const localsMiddelWare = (req, res, next) => {
    const accessToken = req.get('accessToken');

    if (typeof accessToken != 'undefined') {
        jwt.verify(accessToken, process.env.SECRET_KEY)
            .then(decoded => {
                if (decoded) {
                    return users.findById(decoded.id);
                } else {
                    next();
                }
            })
            .then(user=>{
                    req.locals.user = user;
            })
    }
    res.locals.siteName = "SaMoIm";
    next();
};

export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
}

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect(routes.home);
    }
}