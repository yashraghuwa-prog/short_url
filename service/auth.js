const sessionidtousermap =new Map();


function setuser(id,user){
    sessionidtousermap.set(id,user);

}

function getuser(id){
    sessionidtousermap.get(id);
    
}

module.exports={
    setuser,
    getuser,
}