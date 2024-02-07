const mongoose = require("mongoose");

const Warehouse = mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
        default:0,
    },
    lotNo:{
        type: String,
        required: true,
    },
    rackno:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Warehouse',Warehouse);