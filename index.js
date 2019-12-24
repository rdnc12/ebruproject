//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const app = express();

app.use(
  session({
    secret: "our little secret.",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static("public"));



mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);



const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: {
    type: String,
    default: Math.random()
      .toString(36)
      .substr(2, 16)
  }, //otomatik sifre olusturur
  name: String,
  surname: String,
  website: String,
  rol: {
    type: String,
    enum: ["admin"]
  }
}); //



userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);



passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});




const postSchema = new mongoose.Schema({
  Baslik: String,
  post: { type: String },
  Kategori: {type: String},
  keywords: String,
  commentNumber: { Number, default: 0 },
  time: { type: Date, default: Date.now },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  _username: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }
});

const Post = new mongoose.model("Post", postSchema);




const commentSchema = new mongoose.Schema({
  comment: String,
  yourName: { type: String, required: true },
  yourEmail: { type: String, required: true },
  abone: { type: Boolean, default: true },
  commentConfirmation: { type: Boolean, default: false }
});

const Comment = new mongoose.model("Comment", commentSchema);




//TODO

app.get("/", (req, res) => {
  return res.render("home");
});


app.get("/admin", function(req,res){
    res.render ("admin");
  });



app.get("/nieuws", function(req,res){
    res.render("nieuws")
});

app.get("/about", function(req,res){
    res.render("about")
});


app.get("/projecten", function(req,res){
    res.render("projecten")
});

app.get("/doe-mee", function(req,res){
    res.render("doe-mee")
});

app.get("/nieuwsbrieven", function(req,res){
    res.render("nieuwsbrieven")
});

app.get("/samenwerkingpartners", function(req,res){
    res.render("samenwerkingpartners")
});

app.get("/contacts", function(req,res){
    res.render("contacts")
});


  
  app.post("/admin", async (req, res) => {
    
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
  
    req.login(user, err => {
      if (!err) {
        passport.authenticate("local", {failureFlash: "Invalid username or password."})
        (req, res, () => {
          const rol = User.findOne({ username: user.username }, (err, foundUser) => {
            return foundUser.rol;
          });
          if (rol==="admin"){
            const userAll = User.find ( );
            const commentAll = Comment.find ();
            const postAll= Post.find();
            res.render("index", {userAll, commentAll, postAll});
          }
          
          res.redirect("/admin/index");
          
        });
      } else {
        res.send(err);
       }
    });
  
    
  });




  app.post("/admin", async (req, res) => {
    let newpost = req.body.post;
    
  
    const newPost = new Post({
      post: newpost,
     _username: req.user.id,
      time: new moment()
    });
  
    try {
      await newPost.save();
  
      res.redirect("home");
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post("/compose",function(req,res){

    const post={
      title:req.body.postTitle,
      content:req.body.postBody
    };
    posts.push(post);
    res.redirect("/");
  });





app.listen(3001, function() {
  console.log("Server started on port 3000");
});
