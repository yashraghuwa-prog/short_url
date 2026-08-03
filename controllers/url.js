const shortid = require("shortid");
const URL = require("../models/url");
const url = require("../models/url");

async function handlegennewurl(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "url is required" });
    }

    const shortID = shortid();

    await URL.create({
        shortid: shortID,
        redirecturl: body.url,
        visithistory: [],
    });
    return res.render("home",{
        id:shortID,

    })
    return res.json({ id: shortID });
}

async function handleanalytics(req,res) {
    const shortid=req.params.shortid;
    const result=await url.findOne({shortid})
    return res.json({
        totalclicks:result.visithistory.length,
        analutics: result.visithistory
    });
}

module.exports = {
    handlegennewurl,
    handleanalytics,
};