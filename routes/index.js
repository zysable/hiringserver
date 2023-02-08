const express = require('express')
const router = express.Router()
const userController = require('../http_controller/usercontroller')
const chatController = require('../http_controller/chatcontroller')

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {title: 'Express'})
})

router.post('/register', userController.regUser)
router.post('/login', userController.logUser)
router.post('/update', userController.updateUser)
router.get('/getuserinfo', userController.getUserInfo)
router.get('/getuserlist', userController.getUserList)

router.get('/msglist', chatController.getChatList)
router.post('/readmsg', chatController.readMsg)

module.exports = router
