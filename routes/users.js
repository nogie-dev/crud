var express = require('express');
const query=require('../db/query')
var router = express.Router();

router.post('/register', function(req, res, next) {
  let {id,password,nickname}=req.body
  query.userRegister(id,password,nickname)
  .then((queryRes)=>{
    res.json(queryRes)
  })
});

module.exports = router;
