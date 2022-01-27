const express = require('express');
const app = express();
const PORT = 9000;
const mongoose = require("mongoose");
const { connectDB } = require('./config/db');
const router = require('./routes/employeeRoutes')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/user', router)


connectDB()

app.listen(PORT, () => {
    console.log(`listening at port : ${PORT}`)
})