var express = require('express');
const query=require('../db/query')
var router = express.Router();

// default
router.post('/', function(req, res, next) {
  res.json({
    status:400,
    message:'bad request'
  });
});

// register 
// router.get('/register', function(req, res, next) {
//   res.render('registerForm.ejs', { title: 'Express' });
// });

// router.post('/registerProc', function(req, res, next) {
//   var id=req.body.id;
//   var pw=req.body.pw;
//   var nickname=req.body.nickname;

//   var judge=query.checkDupAccount(id);
//   console.log(judge)
//   //query.registerQuery(id,pw,nickname);
//   res.redirect('index.ejs') //로그인 성공시 리다이렉트
// });

// login
// router.get('/login', function(req, res, next) {
//   res.render('loginForm.ejs', { title: 'Express' });
// });

// router.post('/loginProc', function(req, res, next) {
//   res.redirect('index.ejs', { title: 'Express' });
// });

module.exports = router;
