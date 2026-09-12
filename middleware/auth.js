const { getuser } = require("../service/auth");

function checkforauthentication(req, res, next) {
    const token = req.cookies?.uid;

    req.user = null;

    if (!token) {
        return next();
    }

    const user = getuser(token);

    req.user = user;

    return next();
}

function restrictTO(roles = []) {
    return function (req, res, next) {

        if (!req.user) {
            return res.redirect("/login");
        }

        if (!roles.includes(req.user.role)) {
            return res.end("Unauthorized");
        }

        return next();
    };
}

module.exports = {
    checkforauthentication,
    restrictTO,
};