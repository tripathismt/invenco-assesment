const User = require("../module/User");
const warehouse = require("../module/warehouse");

/****************/
exports.createWarehouse = async (req,res)=>{
    try{

       //get data from body 
    const {email,id,quantity,lotNo,rackno} = req.body;

    //check user is admin or not

    const user = await User.findOne({email})
    console.log(user)
    if(user.role!=='admin'){
        return res.status(400).json({
            success:false,
            message:"you are not admin"
        })
    }

  //check all fields are available or not
    if(!email || !id || !lotNo || !rackno){
        return res.status(400).json({
            success:false,
            message:"please fill all the fields"
        })
    }
  //create the new instance of warehouse
    const newUser = await warehouse.create({
        id,
        quantity,
        lotNo,
        rackno,
    })

    await User
    .updateOne({email:email},{$push:{warehouse:newUser._id}})

  //return success
    return res.status(200).json({
        success:true,
        message:"warehouse created"
    })

    }catch(err){
        console.log(err)
        return res.status(401).json({
            success:false,
            message:"error while creating warehouse"
        })
    }


}



/****************/

//accesible by admin +  user
exports.dataFetch = async (req,res)=>{
    try{

    //get data from body 
    const {email} = req.body;


  //check all fields are available or not
    if(!email){
        return res.status(400).json({
            success:false,
            message:"please login or pass user info"
        })
    }
  //fetch the data of user
    const data = await User.findOne({email:email},{new:true}).populate('warehouse');
    if(!data){
        return res.status(400).json({
            success:false,
            message:"user not found"
        })
    }

  //return success
    return res.status(200).json({
        success:true,
        message:"data fetched successfully",
        payload:data
    })

    }catch(err){

        console.log(err)
        return res.status(401).json({
            success:false,
            message:"error while fetching data"
        })
    }


}



/*******************/
//update by both
exports.updateItem = async (req,res)=>{
    try{

    //get data from body 
    const {id,flag} = req.body;


  //check all fields are available or not
    if(!id || !flag){
        return res.status(400).json({
            success:false,
            message:"please login or pass user info"
        })
    }
  //update the data of user
    const data = await warehouse.findOneAndUpdate({_id:id},{$inc: { quantity: flag }});

  //return success
    return res.status(200).json({
        success:true,
        message:"updated successfully",
        payload:data
    })

    }catch(err){
        return res.status(401).json({
            success:false,
            message:"error while fetching data"
        })
    }


}
