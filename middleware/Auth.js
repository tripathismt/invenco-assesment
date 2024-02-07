const User = require('../module/User')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

 exports.loginAuth = async (req,res,next)=>{
        const {email,password} = req.body;

        //check all fields available or not
        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"please enter all the fields",
            })
        }

       //check user exist or not
         const user = await User.findOne({email});
         if(!user){
            return res.status(401).json({
                success:false,
                messagge:"user does not exist"
            })
         }


       //check password matchec or not
        const match = await bcrypt.compare(password , user.password);
        if(!match){
            return res.status(401).json({
                success:false,
                messagge:"incorrect password"
            })
        }
       
       
       next();
}

exports.signUpAuth = (req,res,next)=> {
    // try{
    const {name , email , mobile , password , confirmPassword,role} =  req.body; 
    // console.log(req.body);
     
    //check all fields are available or not
    if(!name || !email || !mobile || !password || !confirmPassword || !role ){
        return res.status(401).json({
            success:false,
            message:"please enter all the fields",
        })
    }
    //check email validity
    if(!email.includes('@')){
        return res.status(401).json({
            success:false,
            message:"enter correct email",
        })
    }

    //check for password authenticity
    const val=password => /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if(password.length < 8 && !val){
        return res.status(401).json({
            success:false,
            message:"choose other Password",
        })
    }
    //check password and confirm password are same or not
    if(password !== confirmPassword){
        return res.status(401).json({
            success:false,
            message:"Confirm Password do not match" ,

        })
    }

    //check mobile Number correct or not
    if(mobile.length>10){
        return res.status(401).json({
            success:false,
            message:'Incorrect Mobile Number'
        })
    }

    next();
  }
//   catch(err){
//     return res.status(401).json({
//         success:false,
//         message:'signup auth fails'
//     })
//   }
// }


exports.cookieLoginAuth = async (req,res,next)=>{
try{
    const {token}=req.cookies;
    // console.log(token)
    //token available or not 
        if(token){
            // Verify the token using jwt.verify method
            const decode = jwt.verify(token,"hello guys");
            next();
        }else{
            // Return response with error
            return res.status(301).json({
                success: false,
                message: 'redirect to login'
            });
        }   
  }
  catch(err){
    return res.status(200).json({
        success:false,
        messaage:"cooke auth fails"
    })
  }
}