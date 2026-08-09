const user=require('../models/user')


async function handleusersignup(req,res) {
    const{name,email,password}=req.body;
    await user.create({
        name,
        email,
        password,
    });
    return res.render("home");
}

async function handleuserlogin(req,res) {
    const{name,email,password}=req.body;

    const user = await user.findOne({

        name,
        email,
    });
    if(!user) return res.render('login',{
        error:'invalid username or password',
    })
    const sessionid=uuidv4();

    return res.render("home");
}

module.exports={
    handleusersignup,
    handleuserlogin,
}