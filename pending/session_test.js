module.exports={
    userSession: function (judge){
        this.sessionAuth=judge
        this.changeToTrue=function(){
            this.sessionAuth=true
        }
        this.changeToFalse=function(){
            this.sessionAuth=false
        }
    }
}