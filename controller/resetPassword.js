const mailer = require("../config/Nodemailer");
const User = require('../module/User')



/****************/
exports.resetPassword = async (req,res)=>{
   try{ 
    
    const {email} = req.body;
     console.log(email)

    //email available or not
    if(!email.includes("@")){
        return res.status(400).json({
            success:false,
            message:"incorrect email"
        })
    }

    const user =  await User.findOne({email});
    //check user exist or not 
    console.log(user)
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not found "
        })
    }

    //create link for mail 
    const link = `http://localhost:3000/resetPassword/${User._id}`

    //send the mail
    
    await mailer.sendmail(email,link);

    // return with success message 

    return res.status(200).json({
        success:true,
        message:"  mail has been send "
    })

  }catch(err){
    return res.status(401).json({
        success:false,
        message:"error in function  "
    })
  } 

}