const express = require("express")
const cookieParser = require('cookie-parser');
const database = require("./config/Databse")
const router = require('./router/Router');
const cors = require('cors')
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 4000;
app.use(express.urlencoded({extended:true}))
app.use(express.json());
database.connect();
app.use(cookieParser());
app.use(cors())

// mailer.sendmail();

app.use('/',router)

app.listen(PORT , ()=>{
    console.log(`app is listening on port Number ${PORT}`)
})