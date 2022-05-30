const Users=require('../models/user')

exports.getBoardlist=function(req,res){
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        //console.log(req.sessionID)
        Users.getBoardList()
        .then((result)=>{
            res.json(result)
        })
    }
}

exports.getDetailView=function(req,res){
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        const number=req.params.no
        Users.detailViewBoard(number)
        .then((result)=>{
            res.json(result)
        })
    }
}

exports.doCreateContent=function(req,res){
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        const {name,title,context}=req.body //req.body 의 key값과 변수의 이름이 동일해야 함
        Users.createBoard(name,title,context)
        .then((result)=>{
            res.json(result)
        })
        //res.json({name,title,context})
    }
}

exports.doUpdateContent=function(req,res){
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        const number=req.params.no
        const {name,title,context}=req.body
        Users.updateBoard(number,name,title,context)
        .then((result)=>{
            res.json(result)
        })
    }
}

exports.doDeleteContent=function(req,res){
    if(!req.session.user){
        res.json({"status":"401","msg":"Unauthorized"})
    }else{
        const number=req.params.no
        Users.deleteBoard(number)
        .then((result)=>{
            res.json(result)
        })
    }
}