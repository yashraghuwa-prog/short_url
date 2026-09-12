const express = require("express");
const { connecttomongodb } = require("./connect");
const { checkforauthentication,restrictTO} = require("../short_url/middleware/auth");
const urlroute = require("./routes/url");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

const url = require("./models/url");
const staticroute = require("./routes/staticrouter");
const userroute = require("./routes/user");

const PORT = 8001;

connecttomongodb("mongodb://localhost:27017/short_url").then(() => {
    console.log("mongodb connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkforauthentication);

app.get("/test", async (req, res) => {
    const allurls = await url.find({});

    return res.render("home", {
        urls: allurls,
    });
});
app.use("/url", restrictTO(["NORMAL","ADMIN"]),urlroute);
app.use("/user", userroute);
app.use("/", staticroute);

app.get("/url/:shortid", async (req, res) => {
    const shortid = req.params.shortid;

    const entry = await url.findOneAndUpdate(
        {
            shortid,
        },
        {
            $push: {
                visithistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    res.redirect(entry.redirecturl);
});
app.listen(PORT, () => console.log(`server started at port: ${PORT}`));