const jwt=require("jsonwebtoken");

function verifyUser(req,res,next) {
    // console.log(req.cookies["abcd"]);
    if(jwt.verify(req.cookies['secret'],process.env.JWT_KEY)){
        console.log("User authorized");
        next();
    }else{
        return res.status(401).json({message:"User not authorized"});
    }
}

module.exports=verifyUser;
