const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            reuired:true,
            maxLength:50,
        },
        description: {
            type:String,
            required:true,
            maxLength:50,
        },
        createAt:{
            type:Date,
            required:true,
            default:Date.now(),
        },
        updateAt:{
            type:Date,
            required:true,
            default:Date.now(),

        }
        
    }
);

module.exports = mongoose.model("Todo", todoSchema);