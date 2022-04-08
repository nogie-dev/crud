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

    userRegister:function(name,id,password){
        try{
            await co
        }catch(error){

        }
    },

    getBoardList:async function(){
        try{
            let [rows,field]=await conn.then((connection)=>connection.execute("select * from board"));
            return rows
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    },

    createBoard:async function(name,title,context){
        try{
            let [rows,field]=await conn.then((connection)=>connection.query("insert into board(name,title,context) values(?,?,?)",[name,title,context]))
            //return rows; 현재 필요 없음
            return {"status":"200", "msg":"success appended content"}
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
        //.catch((error)=>console.log(error));
    },

    deleteBoard:async function(number){
        try{
            await conn.then((connection)=>connection.execute("delete from board where no=?",[number]))
            return {"status":"200", "msg":"success deleted content"}
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    },
    
    detailViewBoard:async function(number){
        try{
            let [rows,field]=await conn.then((connection)=>connection.query("select * from board where no=?",[number]))
            return rows
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    },

    updateBoard:async function(number,name,title,context){ //update 하려는 colum값이 동일 할 경우 시간이 소요되지 않음
        try{
            await conn.then((connection)=>connection.execute("update board set name=?, title=?, context=? where no=?",[name,title,context,number]))
            return {"status":"200", "msg":"success updated content"}
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    }
}