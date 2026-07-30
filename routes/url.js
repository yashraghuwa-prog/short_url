const express=require("express");
const router=express.Router();
const{handlegennewurl,handleanalytics}=require("../controllers/url")

router.post("/",handlegennewurl);
router.get('/analytics/:shortid',handleanalytics);
module.exports=router;
