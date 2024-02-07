const mongoose = require("mongoose")
const url = 'mongodb+srv://panditarpit:1234567890@cluster0.uwspq8q.mongodb.net/?retryWrites=true&w=majority';
exports.connect = async ()=>{
    mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 60000, // Set a longer timeout
      })
    .then(console.log("database connected successfully"))
    .catch((err)=>{
        console.log("There is problem with connecting with mongoDb")
        process.exit(1);
    })
}

