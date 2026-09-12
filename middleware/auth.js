const { getuser } = require("../service/auth");

function checkforauthentication(req, res ,next){
    const tokencookie=req.cookies?.uid;
    req.user=null;
    if(!tokencookie){
        return next();
       
    }
    const token=tokencookie;
    const user= getuser(token);
}

function restrictTO(roles=[]){
 return function(req,res,next){
    if(!req.user) return res.redirect("/login");

    if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

    return next();
 }
}

module.exports = {
    checkforauthentication,
    restrictTO,
    
};