const User = require("../module/User")
const Secret = require("../module/Secret")

exports.dataFetch = async(req,res)=>{
   try {
    
    const {email} = req.body;

    //fetch the user data
    const user = await User.findOne({email})

    //fetch user all from user 
    const secret =  await Secret.find({});

    // send all user and secret info 

    return res.status(200).json({
        success:true,
        message:"data fetched successfully",
        user:user,
        secret:secret
    })
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"error while data fetching"
        })
    }

}


exports.addSecret = async(req,res)=>{
    try {
        
    const {email,comment} = req.body;
 
     //fetch the user data
     const secret = await Secret.create({secret:comment});
     console.log(secret);
     const user = await User.findOneAndUpdate({ email }, { secret: secret._id }, { new: true });
     console.log(user);

     // send all user and secret info 
 
     return res.status(200).json({
         success:true,
         message:"data fetched successfully",
         user:user,
         secret:secret,

     })
     }catch(err){
         return res.status(401).json({
             success:false,
             message:"error while data adding"
         })
     }
 
 }


 exports.deleteSecret = async (req,res)=>{
    try {
        
    const {email} = req.body;
    //  console.log(email)
     //fetch the user data
     const info = await User.findOne({ email });
     console.log(info)
    const result = await Secret.deleteOne({ _id: info._id });
     const user = await User.findOneAndUpdate({ email }, { secret: null }, { new: true });
    //  console.log(user)

     // send all user and secret info 
 
     return res.status(200).json({
         success:true,
         message:"data fetched successfully",
         user:user,
     })
     }catch(err){
        console.log(err)
         return res.status(401).json({
             success:false,
             message:"error while data deleting"
         })
     }
 
 }