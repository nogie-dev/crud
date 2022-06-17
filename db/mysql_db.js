const mysql=require('mysql2/promise')
const master={
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'root',
    database:'test'
};

const slave={
    host:'127.0.0.1',
    port:'3307',
    user:'root',
    password:'root',
    database:'test'
};

module.exports={
    init_master:async function(){
        return await mysql.createConnection(master).then(res=>res);
    },
    init_slave:async function(){
        return await mysql.createConnection(slave).then(res=>res);
    }
};