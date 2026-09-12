const { getuser } = require("../service/auth");

function restricttologgeduseronly(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.redirect("/login");
    }

    const token = authHeader.split(" ")[1];

    const user = getuser(token);

    if (!user) {
        return res.redirect("/login");
    }

    req.user = user;

    next();
}

function checkauth(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        req.user = null;
        return next();
    }

    const token = authHeader.split(" ")[1];

    const user = getuser(token);

    req.user = user || null;

    next();
}

module.exports = {
    restricttologgeduseronly,
    checkauth,
};