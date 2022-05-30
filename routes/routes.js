
var express = require('express');
var router = express.Router();

//controllers import
const indexController=require('../controllers/index_controller')
const userController=require('../controllers/user_controller')
const boardController=require('../controllers/board_controller')

//index
router.all('/',indexController.index);

//user
router.post('/user/register',userController.doRegister);
router.post('/user/login',userController.doLogin);
router.get('/user/logout',userController.doLogout);

//board
router.get('/board',boardController.getBoardlist)
router.get('/board/:no',boardController.getDetailView)
router.post('/board',boardController.doCreateContent)
router.patch('/board/:no',boardController.doUpdateContent)
router.delete('/board/:no',boardController.doDeleteContent)

module.exports=router;