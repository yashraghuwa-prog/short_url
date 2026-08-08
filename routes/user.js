const express=require("express");
const {handleusersignup,handleuserlogin}=require("../controllers/user")
const router=express.Router();
router.post('/signup',handleusersignup)
router.post('/login',handleuserlogin)
module.exports=router;
