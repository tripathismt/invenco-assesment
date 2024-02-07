const  mongoose = require("mongoose")


const User = mongoose.Schema({
    role:{
        type:String,
        required:true,
        enum:['admin','user']
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    warehouse:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Warehouse',
        default:null,
    }]
})

module.exports = mongoose.model('User',User);