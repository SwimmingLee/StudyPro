import routes from "./routes"

export const localsMiddelWare = (req, res, next) => {
    res.locals.siteName = "SaMoIm";
    res.locals.routes = routes;
    next();
};