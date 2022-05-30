exports.index=function(req,res){
    res.json({
        "status":res.statusCode,
        "msg":"welcometo crud api server"
    })
}