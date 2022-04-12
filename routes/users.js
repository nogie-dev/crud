var express = require('express');
const query=require('../db/query')
const redisSession=require('../db/redis_test')
var router = express.Router();

let sessionJudge=false

router.post('/register', (req, res, next)=>{
  let {id,password,nickname}=req.body
  query.userRegister(id,password,nickname)
  .then((queryRes)=>{
    res.json(queryRes)
  })
});

router.post('/login', async(req, res, next)=>{
  let {id,passwo2rd}=req.body

  const sessionJudge=await redisSession.existKeyChekcer(id)
  if(sessionJudge==0){ //세션이 없으니 생성해야함
    //console.log(sessionJudge)
    //console.log(req.cookies.session) // 이 값을 redis 로 조회해서

    query.userLogin(id,password)
    .then((queryRes)=>{
      if(queryRes==true){ //로그인 성공 시
        redisSession.setValue(id,"tost")
        res.cookie('session','tost').json({'loginResult':queryRes})
      }else{ //로그인 실패 시
        res.json({'loginResult':queryRes})
      }
    })
  }else{ //세션이 존재할 경우
    sessionJudge=true
  }

  router.post('/logout', )
});


module.exports = router;
