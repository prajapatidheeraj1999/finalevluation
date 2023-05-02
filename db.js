const mongoose=require("mongoose")
require("dotenv").config()
const conection =mongoose.connect(process.env.userport)
module.exports={conection}