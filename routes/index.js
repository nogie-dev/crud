var express = require('express');
const app = require('../app');
var router = express.Router();

const account=require('./account.js')
const user=require('./users.js')

//app.use(express.static(__dirname, "../public"));

// default
// router.use('/account',account);
// router.use('/users',user);

module.exports = router;