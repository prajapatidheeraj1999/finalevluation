
const express=require("express")
const {postmodel}=require("../model/postmodel")
const postroute=express.Router()

postroute.get("/",async(req,res)=>{
    console.log("post is working properly")
    try{
        let qury=req.query
        const data=await postmodel.find(qury)
        res.status(200).send(data)

    }catch(err)
    {
        res.status(400).send(err)
        
    }

})

postroute.post("/create",async(req,res)=>{

    try{
        let postdata=new postmodel(req.body)
        await postdata.save()
        res.send({"mas":"data added successfully"})

    }catch(err)
    {
        res.send({"err":"something is wrong"})

    }
})
postroute.patch("/update/:id",async(req,res)=>{
    const id=req.params.id

try{
    const data=await postmodel.findOne({_id:id})
    if(data.auther!==req.body.auther)
    {
        res.send({"mas":"you are not authories person"})
    }else{
        const updatadata=await postmodel.findByIdAndUpdate({_id:id},req.body,{new:true})
        if(updatadata)
        {
            res.send({"mas":"data is chenge"})
        }else{
            res.send({"err":"somthing is wrong"})
        }
    }
    }catch(err)
    {
        res.send({"err":"somthing is wrong"})
        
    }
})
postroute.delete("/delete/:id",async(req,res)=>{

    const id=req.params.id

    try{
        const data=await postmodel.findOne({_id:id})
        if(data.auther!==req.body.auther)
        {
            res.send({"mas":"you are not authories person"})
        }else{
            const updatedelete=await postmodel.findByIdAndDelete({_id:id})
            if(updatedelete)
            {
                res.send({"mas":"data is deleted"})
            }else{
                res.send({"err":"somthing is wrong"})
            }
        }
        }catch(err)
        {
            res.send({"err":"somthing is wrong"})
            
        }
})

module.exports={postroute}