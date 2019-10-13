const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const SubSchema=new Schema({
    _id:String,
    first_name:String,
    last_name:String,
    email:String
})

module.exports=mongoose.model("sub",SubSchema);