const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    vegetableName:{
        type:String,
        required:true
    },
    unit:{
        type:String,
        enum:['kg','gram','nos'],
        required:true
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    ratePerUnit:{
        type:Number,
        required:true
    },
})

const Entry = mongoose.model("Entry",entrySchema)

module.exports = Entry