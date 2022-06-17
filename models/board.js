var db=require('../db/mysql_db')
const master=db.init_master()
const slave=db.init_slave()

module.exports={
    getBoardList:async function(){
        try{
            let [rows,field]=await slave.then((connection)=>connection.query("select * from board"));
            console.log(rows)
            return rows
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    },

    createBoard:async function(name,title,context){
        try{
            let [rows,field]=await master.then((connection)=>connection.query("insert into board(name,title,context) values(?,?,?)",[name,title,context]))
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
            await master.then((connection)=>connection.execute("delete from board where no=?",[number]))
            return {"status":"200", "msg":"success deleted content"}
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    },
    
    detailViewBoard:async function(number){
        try{
            let [rows,field]=await slave.then((connection)=>connection.query("select * from board where no=?",[number]))
            return rows
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    },

    updateBoard:async function(number,name,title,context){ //update 하려는 colum값이 동일 할 경우 시간이 소요되지 않음
        try{
            await master.then((connection)=>connection.execute("update board set name=?, title=?, context=? where no=?",[name,title,context,number]))
            return {"status":"200", "msg":"success updated content"}
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    },
}