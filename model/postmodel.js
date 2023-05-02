
const mongoose=require("mongoose")

const postschema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    author:{type:String,required:true},
    device:{type:String,required:true}
})
const postmodel=mongoose.model("mobilepost",postschema)
module.exports={postmodel}