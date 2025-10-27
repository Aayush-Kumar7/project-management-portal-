const Joi = require('joi');

const SignupValidation = (req, res, next) => {
    const schema = Joi.object({
        name:Joi.string().min(3).max(20).required(),
        email:Joi.string().min(5).max(20).required(),
        password:Joi.string().min(5).max(10).required("@"),
        role:Joi.string().valid('user','admin').required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(401).json({message:error.details[0] ||"Bad request", success:false});
    }
    next();
}

module.exports = {SignupValidation};