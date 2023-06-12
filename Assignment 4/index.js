const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const server = express();
let Students = require("./Model/students");
var expressLayouts = require("express-ejs-layouts");
const multer = require("multer")
const path = require("path")
let checkSessionAuth = require("./middlewares/checkSessionAuth");
//Set View Engine

//Use For Body Parser
server.use(express.json());
//getting data from url
server.use(express.urlencoded({extended: false}));
server.use(cookieParser());

server.use(
  session({
    secret: "Dont copy code work hard",
    cookie: { maxAge: 600000 },
    resave: true,
    saveUninitialized: true,
  })
);

//Define Static Folder
server.use(express.static("public"));


server.set("view engine", "ejs");
server.use(expressLayouts);
const PORT = 5000;



server.use(require("./middlewares/siteSettings"));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    }, filename: (req, file, cb) => {
   
        var temp=Date.now() + path.extname(file.originalname)
        cb(null,temp )
        req.body={...req.body,image:temp}


    }

})

const upload = multer({ storage })


server.get("/",async(req, res, next) => {
    let students = await Students.find();
 
  res.render("home",{students});
});
server.get("/add",checkSessionAuth,  (req, res, next) => {
  res.render("add");
});
server.get("/contactus", (req, res, next) => {
  res.render("contactus");
});
server.get("/about", (req, res, next) => {
    res.render("about");
  });

 

  server.get("/view:id",checkSessionAuth,  async(req, res, next) => {
   
    let students = await Students.find({_id:(req.params.id).split(":")[1]});
    
    res.render("view",{data:students[0]});
  });

  server.get("/edit:id",checkSessionAuth,  async(req, res, next) => {
    
    let students = await Students.find({_id:(req.params.id).split(":")[1]});
   
    res.render("edit",{data:students[0]});
  });
  server.post("/update",checkSessionAuth,upload.single('image') , async(req, res, next) => {
   
    let students = await Students.find({rollnumber:req.body.rollnumber});
    let stude = await Students.updateOne({_id:students[0]._id},req.body);
    
    res.redirect('/')
  });


  //Students
  server.post('/addStudents',upload.single('image'),async(req,res,next)=>{
    try{
      let student = new Students(req.body);
      await student.save();
      res.redirect('/')
    }catch(e){
      console.log("error",e.code)

      if(e.code==11000){
        req.flash("danger", "User with this email is already present");
        res.redirect('/add')
      }

    }
    
  })

  server.get("/delete:id",checkSessionAuth,  async(req, res, next) => {
  
    let students = await Students.findByIdAndDelete({_id:(req.params.id).split(":")[1]});
   
    res.redirect('/')
  });

  server.get('/login',(req,res)=>{
    res.render("login");
  })
  server.get('/register',(req,res)=>{
    res.render("register");
  })
  server.use("/api/auth", require("./routes/auth"));

  server.use((req, res, next) => {
    res.render("notfound");
  });

server.listen(PORT, () => {
  console.log(`Server is running on  port ${PORT}`);
});

const MONGODBURL =
  "mongodb+srv://Muneebrasheed:muneeb123@cluster0.nrodrnr.mongodb.net/";
mongoose
  .connect(MONGODBURL, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message));

 
