const express = require('express')
const {getUsersController, updateUsersController} = require('../controlers/usersControler')
// const updateUsersController = require('')
const usersRoutes = express.Router()

usersRoutes.get('/' , getUsersController)

// usersRoutes.post('/users' , addUserController)

usersRoutes.put('/' , updateUsersController)

// usersRoutes.get('/users' , deleteUserController)

module.exports = usersRoutes