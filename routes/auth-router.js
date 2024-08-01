const express = require('express')
const router = express.Router()
const {registerUser, getAllUsers, deleteUser} = require('../controllers/auth-controller')

router.route('/register').post(registerUser)
router.route('/').get(getAllUsers)
router.route('/:id').delete(deleteUser)


module.exports = router