const express=require("express")
const useroute=express.Router()
const {usermodel} =require("../model/usermodel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
useroute.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body

    try{
        const finder=await usermodel.findOne({email})
        if(finder)
        {
            return res.send({"mas":"user already exist"})
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {

                const usersadd=new usermodel({name,email,password:hash,gender})
                await usersadd.save()
                res.status(200).send({"mas":"user has been added"})
                // Store hash in your password DB.
            });
        }

    }catch(err)
    {
        res.status(400).send({"err":"something is wrong"})

    }

})

useroute.post("/login",async(req,res)=>{

    try{
        const {email,password}=req.body
        const logindata=await usermodel.findOne({email})
        if(logindata)
        {
            bcrypt.compare(password, logindata.password, function(err, result) {

                if(result)
                {
                    const token=jwt.sign({author_id:logindata._id},"dheeraj")
                    res.status(200).send({"mas":"user login successfull",token})
                }else{
                    res.send({"mas":"check password"})
                }
                
            });
        }
        else{
            res.send({"mas":"check password"})
        }

    }catch(err)
    {
        res.status(400).send({"err":"something is worg"})
        
    }
    
})

module.exports={useroute}