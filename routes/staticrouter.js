const express = require("express");
const URL = require("../models/url");
const { restrictTO } = require("../middleware/auth");

const router = express.Router();
router.get('/admin/urls',restrictTO(['ADMIN']),async(req,res)=>{

    const allurls = await URL.find({});

    return res.render("home", {
        urls: allurls,
    });
})

router.get("/", restrictTO(["NORMAL","ADMIN"]), async (req, res) => {

    const allurls = await URL.find({
        createdBy: req.user._id
    });

    return res.render("home", {
        urls: allurls,
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;