const express=require("express");
const authRouter = express.Router(); //authentication router
const userModel=require("../models/userModel");
const verifyUser=require("./verify");
const jwt=require("jsonwebtoken");


authRouter.post("/login",loginUser).post("/signup", createdAt, signupUser).get("/protected",verifyUser,protected);

//------------- Auth functions------------
//middleware function
function createdAt(req, res) {
  // console.log(req.body);
  let userObject = req.body;
  if (Object.keys(userObject).length === 0) {
    return res.status(400).json({
      message: "user cannot be created",
    });
  } else {
    signupUser(req, res);
  }
}

async function signupUser(req, res) {
  try {
    console.log(req.body);
    const userModel = require("./models/userModel");
    let user = await userModel.create(req.body);
    console.log(user);
    return res
      .status(200)
      .json({ message: "user created", createdUser: req.body });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to create user" });
  }
}

async function loginUser(req,res){
    try {
        if(req.body.email){
            const user=await userModel.findOne({email:req.body.email});
            if(user){ //if user is found
                //then verify his password 
                if(req.body.email===user.email && req.body.password===user.password){
                    //if veified, then create a JWT token, and store that inside a cokkie and
                    let token = jwt.sign({id:user._id}, process.env.JWT_KEY);//creating JWT token
                    res.cookie('secret',token, { maxAge: 900000, httpOnly: true }); //send the cookie to the browser or the client
                    //set the header, payload
                    return res.status(200).json({message:"User authenticated successfully"});
                }else{
                    return res.status(401).json({message:"Email or password invalid"});
                }
            }else{
                return res.status(401).json({message:"Email or password invalid"});
            }
        }else{
            return res.status(403).json({message:"Email not found"});
        }
        
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
    
}

// function verify(req,res,next) {
//     // console.log(req.cookies["abcd"]);
//     if(req.cookies["abcd"]==="1234"){
//         next();
//     }else{
//         return res.status(401).json({message:"User not authorized"});
//     }
// }

function protected(req,res) {
    console.log("inside protected");
    // console.log(req.cookies.value);
    res.send("protected reached!");
}

module.exports=authRouter;
