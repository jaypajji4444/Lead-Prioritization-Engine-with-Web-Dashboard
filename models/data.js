const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const product=new Schema({
    _id:{type:String},
    name:{type:String},
    price:{type:String},
    img:{type:String}
})


const UserSchema=new Schema({
    _id:{type:String},
    name:{type:String},
    email:{type:String},
    product:[product]

})


module.exports=mongoose.model("user",UserSchema);