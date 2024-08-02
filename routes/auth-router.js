const express = require('express')
const router = express.Router()
const {registerUser, getAllUsers, deleteUser, login} = require('../controllers/auth-controller')

router.route('/register').post(registerUser)
router.route('/').get(getAllUsers)
router.route('/login').post(login)


module.exports = router