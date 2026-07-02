const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const uuid = require('uuid')
const {v4: uuidv4} = uuid
const users = require("../models/usermodel");
const Users = require("../models/usermodel");


const signupController = async (req,res) => {


   try{

        const { email , password, age, userName} = req.body

   if(!email || !password || !age || !userName) return res.json({
    status: false,
    Message: " ALL Fields are required"
   });


   bcrypt.hash(req.body.password, 12 , async function(err, hash) {
    // Store hash in your password DB.
    console.log(hash , "======>>>>>>> Hash");

    req.body.password = hash


    await users.create(req.body)

    console.log(uuidv4());
    

  await sendEmailOTP(req.body.email, '12345678')

    res.json({
        status: true,
        Message: "User Signup Succcessfully"
    })





    
});
   

   } catch (error) {
    console.log(error, " ======>>>> error");
    res.json({
        status: false,
        Message: error.message
    })
    
   }


};


const loginController = async (req,res) => {

    try{
    
         const {email, password} = req.body

   const myUser = await users.findOne({
        email: email
    });

    if(!myUser) return res.json({
        status: false,
        message: "No User Found"
    })


   // Load hash from your password DB.
bcrypt.compare(password, myUser.password, function(err, result) {
    // result == true


    if(result) {

        
    console.log(myUser, "=======>>>>> myUser")
  
   const token = jwt.sign({
    email: myUser.email,
    userName: myUser.userName,
    id: myUser._id
   } , process.env.JWT_SECRAT, {expiresIn: 1 * 60})

    return res.json({
        status: true,
        Message: "User Login Succcessfully",
        token: token
    })
    }



    return res.json({
        status: false,
        message: "Worng Password"
    })


});
 

    } catch(error) {

        console.log(error.message, "======>>>> error in login");
    
    }


}


module.exports = {
    signupController,
    loginController
}