const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

const Signupcontroller = async(req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        console.log(req.body);
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(401).json({message:"User already exists", success:false});
        }

        const userModel = new UserModel({name,email,password,role});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        return res.status(201).json({message:"User registered successfully", success:true});

    }catch(err){
        res.status(500).json({message:"Server Error controller", success:false});
    }
}

module.exports = {Signupcontroller};