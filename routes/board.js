var express = require('express');
const query=require('../db/query')
const session=require('../pending/session_test')
const redisControl=require('../db/redis_test')
var router = express.Router();

const user =new session.userSession("false")

router.get('/',async (req,res)=>{
    const sessionKey=req.cookies.session
    const sessionJudge=await redisControl.existKeyChekcer(sessionKey)
    if (sessionJudge==1){
        user.changeToTrue()
    }else{
        user.changeToFalse()
    }

    if(user.sessionAuth==true){
        query.getBoardList()
        .then((queryRes)=>{
            res.json(queryRes)
        })
    }else{
        res.json({"msg":"unauthorized user"})
    }
})

router.get('/:no',(req,res)=>{
    const number=req.params.no
    query.detailViewBoard(number)
    .then((queryRes)=>{
        res.json(queryRes)
    })
})

router.post('/',(req,res)=>{
    const {name,title,context}=req.body //req.body 의 key값과 변수의 이름이 동일해야 함
    query.createBoard(name,title,context)
    .then((queryRes)=>{
        res.json(queryRes)
    })
    //res.json({name,title,context})
})

router.patch('/:no',(req,res)=>{
    const number=req.params.no
    const {name,title,context}=req.body
    query.updateBoard(number,name,title,context)
    .then((queryRes)=>{
        res.json(queryRes)
    })
})

router.delete('/:no',(req,res)=>{
    const number=req.params.no
    query.deleteBoard(number)
    .then((queryRes)=>{
        res.json(queryRes)
    })
})

module.exports = router;