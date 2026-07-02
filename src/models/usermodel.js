const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    userName: {
      
      type: String,
      required: true
    },
    email: {

        type: String,
        required: true
    }, 
    password: {

         type: String,
        required: true,
        minlength: 8
    },
    age: {

        type: Number,
        required: true,
        min: 18
    } 

})

const users = mongoose.model('user' , userSchema)

module.exports = users