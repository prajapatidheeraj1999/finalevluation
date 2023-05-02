const express=require("express")
const cors=require("cors")
const {postroute}=require("./router/postroute")
const {useroute}=require("./router/useroute")
const {authentices}=require("./middleware/authentication")
const {conection}=require("./db")

const app=express()
app.use(express.json())
app.use(cors())
app.use("/users",useroute)

app.use(authentices)

app.use("/post",postroute)




app.listen(8080,async()=>{
    try{
        await conection
        console.log("data base connection is stablesh")

    }catch(err)
    {
        console.log(err)
        console.log("somethig is issue i database connection")

    }
})