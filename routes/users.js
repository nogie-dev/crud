var express = require('express');
const query=require('../db/mysql_query')
var router = express.Router();

router.post('/register', (req, res, next)=>{
  let {id,password,nickname}=req.body
  query.userRegister(id,password,nickname)
  .then((queryRes)=>{
    res.json(queryRes)
  })
});

router.post('/login', async(req, res, next)=>{
  let {id,passwo2rd}=req.body

  query.userLogin(id,password)
  .then((queryRes)=>{
    if(queryRes==true){ 
        //로그인 성공 시
      res.cookie('session','tost').json({'loginResult':queryRes})
    }else{ 
      //로그인 실패 시
      res.json({'loginResult':queryRes})
    }
  })
  router.post('/logout', )
});


module.exports = router;
