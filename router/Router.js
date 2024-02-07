const express = require('express')
const router = express.Router();
const {loginAuth , signUpAuth ,cookieLoginAuth} = require('../middleware/Auth')
const {login , signup, cookieLogin, signout} = require('../controller/authentication')
const {resetPassword} = require('../controller/resetPassword')
const {newPassword} = require('../controller/newPassword')
const{createWarehouse,dataFetch,updateItem} = require('../controller/warehouse')

router.get('/',(req,res)=>{res.send("server working properly")});

router.post('/login',loginAuth,login);

router.post('/resetPassword',resetPassword);

router.post('/newPassword',newPassword);

router.post('/signup',signUpAuth,signup);

router.get('/signout', signout);

router.get('/dashboard',cookieLoginAuth,cookieLogin);

router.get('/fetchData',cookieLoginAuth,dataFetch);
router.get('/updateitem',cookieLoginAuth,updateItem);

router.get('/createwarehouse',cookieLoginAuth,createWarehouse)

module.exports = router;
