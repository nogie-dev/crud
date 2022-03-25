const mysql=require('mysql')
const conn={
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'root',
    database:'test'
};

//var connection=mysql.createConnection(conn);
//connection.connect();

// connection.query("select * from tost",(err,raws,fields)=>{
//     console.log(raws);
// })

// connection.end();

module.exports={
    init:function(){
        return mysql.createConnection(conn);
    },
    connect:function(conn){
        conn.connect(function(err){
            if(err) console.log('err')
            else console.log('connection success') 
        });
    }
};