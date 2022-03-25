var db=require('./db')
const conn=db.init()

module.exports={
    checkDupAccount:function(id){
        var judge=0
        conn.query("select id from users where id=?",[id],(err,res)=>{
            if(err) console.log(err)
            else console.log('query success')

            //[RowDataPacket { id: 'hello' }] 배열 안에 딕셔너리가 존재함으로 다음과 같이 접근해야 한다.
            try{
                if(res[0]['id']===id){
                    judge=1;
                    //console.log("equal")
                }
            }catch{
                console.log("error")
            }
        })
        return judge;
        //conn.end();
    },

    registerQuery:function(id,pw,nickname){
        conn.query("insert into users(id,pw,nickname) values(?,?,?)",[id,pw,nickname],(err,res)=>{
            if(err) console.log(err)
            else console.log('query success')
        })
        //conn.end();
    }
}