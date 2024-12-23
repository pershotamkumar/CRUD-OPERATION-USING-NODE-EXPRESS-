const exp = require("constants");
const express = require("express");
const { connect } = require("http2");
const app = express();
const port =3000;
const path = require("path")

app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")))

const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')
app.use(methodOverride('_method'));

let posts = [
    {
       id:uuidv4(),
       username:"pershotam",
       content:"hard work until you are not proud for yourself" 
    },
    {   id:uuidv4(),
        username:"elon Musk",
        content:"iam going to buy instagram lol" 
     },
     { 
        id:uuidv4(),
        username:"Mark-z-burg",
        content:"iam going to remove you from instagram" 
     }
]

//get requests
app.get("/post",(req,res)=>{
    res.render("index.ejs",{posts})
})
app.get("/post/new",(req,res)=>{
    res.render("new.ejs")
})

app.get("/post/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id)
    res.render("show.ejs",{post})
})

app.get("/post/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id)
    console.log("opened post :",post)
    res.render("update.ejs",{post})
})



//post requests
app.post("/post",(req,res)=>{
    let {username,content} = req.body
    let id=uuidv4();
    posts.push({id,username,content})
    res.redirect('/post')
    console.log(posts)
})

// patch request
app.patch("/post/:id",(req,res)=>{
    let {id}=req.params;
    let {content}=req.body;
    // console.log(id,content)
    let post = posts.find((p)=>id === p.id)
    post.content =content  
    res.redirect("/post")
    console.log(post)
    
})


app.delete("/post/:id",(req,res)=>{
    let {id} = req.params;
     posts =posts.filter((p)=> id !== p.id)
    res.redirect("/post")
   })


app.listen(port,(req,res)=>{
    console.log(`server is listeing on port ${port} `)
})