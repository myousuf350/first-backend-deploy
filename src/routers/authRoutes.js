const express = require('express')
const { signupController, loginController } = require('../controlers/AuthControler')


const authRoutes = express.Router()

authRoutes.post('/signup' , signupController)
authRoutes.post('/login' , loginController)

module.exports = authRoutes