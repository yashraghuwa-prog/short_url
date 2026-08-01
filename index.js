const express=require("express");
const {connecttomongodb}=require("./connect")
const urlroute=require("./routes/url");
const url=require('./models/url');
const app=express();
const PORT=8001;

connecttomongodb("mongodb://localhost:27017/short_url").then(()=>{
    console.log("mongodb connected")
});

app.use(express.json());

app.get('/test',async (req,res)=>{
    const allurls=await url.find({});
    return res.end(`
        <html>
         <head></head>
         <body>
           <ol>
           ${allurls.map(url=>`<li>${url.shortid}-${url.redirecturl}-${url.visithistory.length}</li>`).join("")}
           </ol>
        </html>
        `);
});


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
