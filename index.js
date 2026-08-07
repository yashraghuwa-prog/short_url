const express=require("express");
const {connecttomongodb}=require("./connect")
const urlroute=require("./routes/url");
const path=require("path")

const app=express();

const url=require('./models/url');
const staticroute=require('./routes/staticrouter');
const userroute=require("./routes/user");

const PORT=8001;

connecttomongodb("mongodb://localhost:27017/short_url").then(()=>{
    console.log("mongodb connected");
});

app.set("view engine","ejs");
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/test',async (req,res)=>{
    const allurls=await url.find({});
    return res.render('home',{
        urls:allurls,
    });

});

app.use("/signup",staticroute)
app.use("/",userroute);
app.use("/url",urlroute);

 app.get("/url/:shortid",async (req,res)=>{
    const shortid =req.params.shortid;
   const entry = await url.findOneAndUpdate({
        shortid
    },{$push:{
        visithistory:{
            timestamp:Date.now(),
        }
    },
  }
);
res.redirect(entry.redirecturl);
});
const mongoose=require("mongoose");


app.listen(PORT,()=>console.log(`server started at port: ${PORT}`));
