require("dotenv").config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express();
const userRoute = require('./routes/userRoute')
const itemRoute = require('./routes/itemRoute')
const authRoute = require('./routes/authRoute')
const transactionRoute = require('./routes/transactionRoute')
const notificationRoute = require('./routes/testRoute')
const errorHandler = require('./middleware/errorHandler')
const PORT = 3000

app.set('trust proxy', true)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use('/api/v1/users', userRoute);
app.use('/api/v1/items', itemRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/transaction', transactionRoute);
app.use('/midtrans', notificationRoute);

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`-> Listening on Port: ${PORT}`);
})