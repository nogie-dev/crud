var express = require('express');
const query=require('../db/query')
const redisControl=require('../db/redis_test')
const ses=require('../pending/session_test')
var router = express.Router();

const user=new ses.userSession("false")

router.post('/register', (req, res, next)=>{
  let {id,password,nickname}=req.body
  query.userRegister(id,password,nickname)
  .then((queryRes)=>{
    res.json(queryRes)
  })
});

router.post('/login', async(req, res, next)=>{
  let {id,password}=req.body
  let test=Math.random().toString(36).substr(2,11); 

  const sessionJudge=await redisControl.existKeyChekcer(id)
  console.log(sessionJudge)
  if(sessionJudge==0){ //세션이 없으니 생성해야함
    //console.log(req.cookies.session) 

    query.userLogin(id,password)
    .then((queryRes)=>{
      if(queryRes==true){ //로그인 성공 시
        redisControl.setValue(test,"blank")
        res.cookie('session',test).json({'loginResult':queryRes})
      }else{ //로그인 실패 시
        //console.log(queryRes)
        res.json({'loginResult':queryRes})
        console.log("login result : "+queryRes)
      }
    })
  }else{ //세션이 존재할 경우
    // user.sessionAuth=true
    res.json({"test":"tost"})
  }
});

// router.post('/logout', )


module.exports = router;
