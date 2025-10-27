const Joi = require("joi");

const Loginvalidation = (req,res,next) =>{
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password: Joi.string().min(5).max(10).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request", error})
    }
    next();
}
module.exports = {Loginvalidation};