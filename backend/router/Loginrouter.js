const {login} = require('../controller/Logincontroller');
const {Loginvalidation} = require('../middleware/Loginvalidation');

const router = require('express').Router();

router.post('/login',Loginvalidation,login);

module.exports = router;