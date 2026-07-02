const express = require('express')

const cors  = require('cors')

const dotenv = require('dotenv');

const mongoose = require('mongoose')

dotenv.config();

const app = express()


const dns = require('node:dns');
const authRoutes = require('./routers/authRoutes');
const usersRoutes = require('./routers/userRouter');

dns.setServers([
    '1.1.1.1', '8.8.8.8'
])

app.use(express.json())


app.use(cors())

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
     
   console.log("DB is Connected");
   

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.get('/health', (req,res) => {

    res.json({
        status: true,
        message: "Backend is working properly"
    })
})


// authentication
// signup login

app.use('/api/v1/auth', authRoutes)

// users
// get, add, update, delete

app.use('/api/v1/users', usersRoutes)


// products





app.listen(process.env.PORT, () => {
    console.log("server is runing on port number", process.env.PORT);
    
})