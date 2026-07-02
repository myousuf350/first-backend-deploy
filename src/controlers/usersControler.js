const users = require("../models/usermodel");
const User = require("../models/usermodel");

const jwt = require("jsonwebtoken");


const getUsersController = async (req, res) => {

    // Frontend se currentPage aayega, agar nahi aaya to default page 1 hoga
const page = Number(req.query.currentPage) || 1;

// Frontend se limit aayegi, agar nahi aayi to 5 users per page dikhao
const limit = Number(req.query.limit) || 5;







// Database me total kitne users hain unki counting karo
const totalUsers = await User.countDocuments();


// Total pages nikal lo
// Example:
// totalUsers = 13
// limit = 5
// 13 / 5 = 2.6
// Math.ceil(2.6) = 3 pages
const totalPages = Math.ceil(totalUsers / limit);


// Frontend se sorting ka parameter lo
// Example:
// asc
// desc
// Ya khali string
let sortAge = req.query.sortAge;


// Agar frontend se asc aaya
// To MongoDB ko bolo age ke hisab se chhote se bade arrange karo
if (sortAge === 'asc') {

    sortAge = 'age';

}


// Agar frontend se desc aaya
// To MongoDB ko bolo age ke hisab se bade se chhote arrange karo
else if (sortAge === 'desc') {

    sortAge = '-age';

}


// Agar user ne sorting select nahi ki
// To default newest users pehle dikhao
else {

    sortAge = '-_id';

}

let myQueryData = {...req.query}

delete myQueryData.limit;
delete myQueryData.currentPage;
delete myQueryData.sort;


let users = []

users = await User.find({
    userName: {
        $regex: myQueryData.search || '',  // ✅ undefined ki jagah empty string
        $options: 'i'
    }
})
.sort(sortAge)

.limit(limit)

.skip((page - 1) * limit);

// Frontend ko response bhejo
res.json({

    status: true,

    // Current page ke users
    data: users,

    // Total pages
    totalPages


});

};







const updateUsersController = async (req, res) => {

    const updateDeatils = req.body

    const token = req.headers.authorization.split(' ')[1]

    console.log(token , "======>>>> token");

  const decode = jwt.verify(token, process.env.JWT_SECRAT);

    console.log(decode);

    await users.findByIdAndUpdate( decode.id , updateDeatils)
    
    

  res.json({

    status: true, 
    message: "User UpDated Successfully"


  })


};





module.exports =  { 
    getUsersController, 
    updateUsersController
};