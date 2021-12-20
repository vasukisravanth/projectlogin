//jshint esversion:6
require('dotenv').config();
const express=require('express');
const bodyparser=require('body-parser');
const ejs=require('ejs');
const app=express();
const mongoose=require('mongoose');
const md5=require('md5');
//const encrypt=require('mongoose-encryption');


console.log(process.env.API_KEY);
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});



const userSchema= new mongoose.Schema({
    email:String,
    password:String
});
const usercSchema= new mongoose.Schema({
    email:String,
    password:String,
    name:String,
    address:String,
    phonenumber:String

});


const vehicleSchema=new mongoose.Schema({
    name:String,
    //milage:Number,
    //price:Number


});
//userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:["password"]});

const User=new mongoose.model("User",userSchema);
const Userc=new mongoose.model("Userc",usercSchema);
const Vehicle=new mongoose.model("Vehicle",vehicleSchema);

app.get("/",function(req,res){
    res.render("home");

});

app.get("/login",function(req,res){
    res.render("login");
    
});

// app.get("/register",function(req,res){
//     res.render("register");
    
// });

app.get("/register",function(req,res){
    res.render("register");
  });

  app.post("/register",function(req,res){

    const newUser=new Userc({
    email:req.body.username,
    password:md5(req.body.password),
    name:req.body.cname,
    address:req.body.address,
    phonenumber:req.body.pno
    });
    newUser.save(function(err){
      if(err){
        console.log(err);
      }else{
        res.render("secrets");
      }
    });
  });
  

const newUser= new User({
    email:"defg",
    password:md5("defg")
});
newUser.save(function(err){
    if(err){
        console.log(err);
    }
    else{
       // res.render("secrets");
       console.log('success');
    }
});

// app.post("/register",function(req,res){
//    });
app.post("/login",function(req,res){
    const username=req.body.username;
    const password=md5(req.body.password);

    Userc.findOne({email:username},function(err,foundUser){
        if(err){
            console.log(err);
        }else{
          if(foundUser){
              if(foundUser.password===password){
                // res.render("secrets"); 
                res.render("vehiclelist");
              }
          }

        }



    });
});
app.post("/vehiclelist",function(req,res){
    const vehicleName=req.body.vehiclename;
  const item=new Vehicle({
      name:vehicleName
  });
  item.save();
  
  console.log(vehicleName);
  res.redirect("/vehiclelist");

});
app.get("/vehiclelist",function(req,res){
    Vehicle.find({},function(err,found){
        if(err)
        {
            console.log("Error");
        }
        else
        {
            res.render("vehiclelist",{ newListItems: found.items });
        }
           
       
    });
});
app.listen(3000,function(){
    console.log('Server started');
});
















//   match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']


//username:sra@g.com
//password:sravan