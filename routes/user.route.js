const express = require("express");
const {UserModel } = require("../models/user.schema")
const jwt = require ("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express.Router();
//register
userRouter.post("/register",async(req,res)=>{
    const  {name,email,gender,password,age,city} = req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send({ "msg":"User already exist, please login"})
            } else {
                const user = new UserModel({name,email,gender,password:hash,age,city})
                await user.save()
                res.send({ "msg":"New User has been to register"})
            }
        })
    }catch(err){
        res.send({ "msg":"New User Unable to register"})
    }
})
//login
userRouter.post("/login",async(req,res)=>{
    const  {email,password} = req.body
    try{
        const user = await UserModel.find({email})
        if(user.length>0){}
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(result){
                let token = jwt.sign({userID:user[0]._id},"linkedin",{expiresIn: "3600s"})
                res.send({ "msg":"Logg In","token":token})
            } else {
               
                res.send({ "msg":"Wrong credentials"})
            }
        })
    }catch(err){
        res.send({ "msg":"New User Unable to Logg In","error":error.message})
    }
})

module.exports={
    userRouter
}