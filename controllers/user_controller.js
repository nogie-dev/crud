const Boards=require('../models/board')

exports.doRegister=function(req,res){
    let {id,password,nickname}=req.body

    Boards.userRegister(id,password,nickname)
    .then((result)=>{

    res.json(result)
  })
}

exports.doLogin=function(req,res){
    let {id,password}=req.body

    if(req.session.user){
        res.json({"status":"tmp","msg":"already exist your session"})
    }else{
        Boards.userLogin(id,password)
        .then((result)=>{
        if(result==true){ 
        //로그인 성공 시

        req.session.user={
          id:id,
          authorized:true
        }
        res.json({"status":"tmp","msg":"success login"})
        }else{ 
        //로그인 실패 시
        res.json({"status":"tmp","msg":"failed login"})
      }
    })
  }
}

exports.doLogout=function(req,res){
    req.session.destroy(function(err){
        if(err) throw err
    })
    
    res.json({"status":"tmp","msg":"success logout"})
}