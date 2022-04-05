var express = require('express');
var db=require('../db/db')
const query=require('../db/query')
const conn=db.init()
var router = express.Router();

router.get('/',(req,res)=>{
    res.json(query.getBoardList()[0])
})

// router.get('/:no',(req,res)=>{

// })

// router.post('/',(req,res)=>{

// })

// router.patch('/:no',(req,res)=>{

// })

// router.delete('/:no',(req,res)=>{

// })

module.exports = router;