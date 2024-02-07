const bcrypt = require('bcrypt');
const User = require('../module/User')
const jwt = require('jsonwebtoken');


//user the role in user module for the refernce about type of role (admin or user)
//for role based authentication i am using a "roletype " which will be sended to the frontend and using the frontend developer will create the route for admin and user 
// also cross checking the validity while warehouse creation for admin as only admin can create the warehouse


exports.login = async(req,res)=>{
    try{
    
    //check already exists or not

    let {token} = req.cookies
    // console.log(token);
    if(token){
        return res.status(400).json({
            success:false,
            message : "already logged in",
        })
    }

    const {email}= req.body;
        console.log(email);
    const user = await User.findOne({email});
        console.log(user)
    // create the token
     token = jwt.sign({userId:user._id},"hello guys",{ expiresIn: "1h" })
     console.log(token)
    
    //pass token with cookie
    await res.cookie('token',token,{maxAge:3600000,httpOnly:true})
    //return to dashboard
    console.log("cookie send")

    const roletype = user.role=='admin'

    return res.status(200).json({
        success:true,
        message:`redirect to ${user.role} dashboarrd`,
        token:token,
        roletype:roletype

    })

    }catch(err){
        return res.status(400).json({
            success:false,
            message : "error while login",
            error:err
        })
    }

}

/**************/

exports.signup = async (req,res)=>{
    try{
        console.log(req.body)
        const {name ,email,password,mobile,role} = req.body;

        //check user already exists or not
        const user = await User.findOne({email})
        console.log(user)
        if(user){
            return res.status(302).json({
                success:false,
                message:"already existing user"
            })
        }


        //hash password
        var hashedPassword = await bcrypt.hash(password, 10);
        console.log ("hashed password" ,hashedPassword);

        //user create &  push to database
        const newUser = await User.create({
            name,
            email,
            mobile,
           password: hashedPassword,
           secret:null,
           role
        })

        const roletype = role==='admin'
        //create token
    
            const token = jwt.sign({userId:newUser._id},"hello guys",{ expiresIn: "1h" })
        

        //send the cookie
        await res.cookie('token',{token},{maxAge:3600000,httpOnly:true})

        //return to dashboard with login true
        return res.status(200).json({
            success:true,
            message:`redirect to ${role} dashboard`,
            roletype:roletype
        })

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message : "error while signup",
            error:err
        })
    }
}


/*************/


exports.cookieLogin = (req,res)=>{
    try{    
        return res.status(200).json({
            success:true,
            message:"direct to dashboard from cookie login"
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message : "error while cookie  login",
            error:err
        })
    }
     

}



/************/
exports.signout = async(req,res)=>{
    try {
       return res
            .status(200)
            .cookie("token","", {expires: new Date(Date.now())})
            .json({
                success:true,
                message:"signout successful"
            })
    } catch(error) {
        res.status(400).json({
            success:false,
            message : "Cannot logot due to some error"
        })
    }
}
