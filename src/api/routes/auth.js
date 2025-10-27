const express = require('express');
const router = express.Router();
const signUpValidator = require('../validators/auth/sign-up.validator');
const loginValidator = require('../validators/auth/login.validator');

const handleSignUp = require('../controllers/auth/handleSignUp');
const handleLogin = require('../controllers/auth/handleLogin');
const verifyUser = require('../middlewares/verifyUser');
const handleGetUser = require('../controllers/auth/handleGetUser');

router.get('/getUser', verifyUser, handleGetUser);

router.post('/sign-up', signUpValidator, handleSignUp);
router.post('/login', loginValidator, handleLogin);



module.exports = router;