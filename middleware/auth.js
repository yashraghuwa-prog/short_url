const {getuser}=require("../service/auth");

async function restricttologgeduseronly(req,res,next) {
    const userid =req.headers["Authorization"];

    console.log(req);

    if(!userid) return res.redirect("/login");
    const token =userid.split('Bearer')[0]
    const user=getuser(userid);

    if(!user) return res.redirect("/login");


    req.user=user;
    next();
}

async function checkauth(req,res,next) {
    const userid =req.cookies?.uid;
    const user=getuser(userid);


    req.user=user;
    next();
}

module.exports={
    restricttologgeduseronly,
    checkauth,
}