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
    },

    getBoardList:async function(){
        let [rows,field]=await conn.then((connection)=>connection.execute("select * from board"));
        return rows
    },

    createBoard:async function(name,title,context){
        try{
            let [rows,field]=await conn.then((connection)=>connection.query("insert into board(name,title,context) values(?,?,?)",[name,title,context]))
            //return rows; 현재 필요 없음
            return {"status":"200", "msg":"success appended content"}
        }catch(error){
            return {"status":"400","msg":"bad request"}
        }
        //.catch((error)=>console.log(error));
    }
}