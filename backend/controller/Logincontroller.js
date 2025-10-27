const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const jwt = require("jsonwebtoken");

const login = async(req,res) =>{
    try{
        const {email,password} = req.body;
        console.log(req.body);
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(403).json({
                message:"email or password is wrong", success : false
            })
        }
        const passequal = await bcrypt.compare(password,user.password);
        if(!passequal){
            return res.status(403).json({message: "password is wrong", success:false})
        }
        const token = jwt.sign({email: user.email, _id:user._id},
            process.env.JWT_SECRET,{expiresIn: "24h"}
    
        );
res.status(200).json({
    message: "Login Successfully",
    success: true,
    token,
    user: {
        _id: user._id,   // <-- include _id here
        name: user.name,
        email: user.email,
        role: user.role
    }
});
    }catch(err){
        res.status(500).json({
            message: "Login controller error", success: false
        })
    }
}

module.exports = {login};