var express = require('express');
const query=require('../db/query')
var router = express.Router();

router.get('/',(req,res)=>{
    query.getBoardList()
    .then((queryRes)=>{
        res.json(queryRes)
    })
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