const {Signupcontroller} = require('../controller/Signupcontroller');

const {SignupValidation} = require('../middleware/Signupvalidation');

const router = require('express').Router();

router.post('/signup',SignupValidation,Signupcontroller);

module.exports = router;