var db=require('../db/mysql_db')
const conn=db.init()

module.exports={
    checkDupId:async function(id){
        try{
            let judge=false
            let [rows,fields]=await conn.then((connection)=>connection.query("select id from users where id=?",[id]))
            
            if(rows[0]){judge=true} //rows[0]에 값이 있을 경우(중복) judge true 그렇지 않으면 false
            return judge
        }catch(error){
            console.log(error)
            //return {"status":"400","msg":"bad request"}
        }
    },

    checkDupName:async function(name){
        try{
            let judge=false
            let [rows,fields]=await conn.then((connection)=>connection.query("select nickname from users where nickname=?",[name]))
            
            if(rows[0]){judge=true}
            return judge
        }catch(error){
            console.log(error)
            //return {"status":"400","msg":"bad request"}
        }
    },

    userRegister:async function(id,password,nickname){
        try{
            let checkId=false
            this.checkDupId(id).then((result)=>checkId=result)

            let checkName=false
            this.checkDupName(nickname).then((result)=>checkName=result)

            console.log(id,password,nickname)

            if(checkId==false&&checkName==false){
                await conn.then((connection)=>connection.execute("insert into users(nickname,id,password) values(?,?,?)",[nickname,id,password]))
                return {"status":"200", "msg":"success registered user infomation"}
            }else{
                return {"status":'Duplicated', "msg":"there is a duplicated with either"}
            }
            //관리자 권한을 부여받아야 할 경우 mysql console로 직접 계정 추가해야함
            
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    },

    userLogin:async function(id,password){
        try{
           let judge=false
           let [rows,fields] = await conn.then((connection)=>connection.query("select id,password from users where id=? and password=?",[id,password]))
           
           if(rows[0]){judge=true}
           return judge
           //console.log(rows)
        }catch(error){
            console.log(error)
            return {"status":"400","msg":"bad request"}
        }
    },
}