const User = require('../module/User')
const bcrypt = require('bcrypt');
exports.newPassword = async (req,res)=>{
   try{
         //fetch id of user 

    const {newPassword,confirmPassword,userId} = req.body;

    console.log(newPassword , confirmPassword )
    if(newPassword !== confirmPassword){
        return res.status(401).json({
            success:false,
            message:'confirm password do not matched'
          })
    }


     const val=newPassword => /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    if(newPassword.length < 8 && !val){
        return res.status(401).json({
            success:false,
            message:"choose other Password",
        })
    }

    //hashed password
    const hashedPassword = await bcrypt.hash(newPassword,10)

    console.log(hashedPassword);

    //fetch user
    const user = await User.findOneAndUpdate({ _id: userId }, { $set: { password: hashedPassword } }, { new: true });

    // return with success message 
    return res.status(200).json({
        success:true,
        message:'password updated successfullly'
      })

   }catch(err){
      console.log(err)
      return res.status(401).json({
        success:false,
        message:'error while updating'
      })
   }

}