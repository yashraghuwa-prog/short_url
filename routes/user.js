const express=require("express");
const {handleusersignup}=require("../controllers/user")
const router=express.Router();
router.post('/user',handleusersignup)
module.exports=router;
