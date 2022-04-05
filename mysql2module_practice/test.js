const mysql=require("mysql2/promise")

const db=async()=>{
    try{
        //dbconnect
        let conn=await mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'test'
        });

        let[rows,field]=await conn.execute("select * from board");
        return [rows]
    }catch(error){
        console.log(error);
    }
}

db().then((test)=>console.log(test[0]));