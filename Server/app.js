const express = require('express');
require('dotenv').config()
const bodyparser = require('body-parser')
const cors = require('cors')
const { connectDb, sequelize } = require('./Config/mysqlDb')
const { Sequelize } = require('sequelize');
const ratelimit = require('express-rate-limit')
const helmet = require('helmet');
const logger = require('./Utils/logger');
const { stack } = require('sequelize/lib/utils');
const { error } = require('winston');
const user = require('./Routes/Api/user')
const Sentry = require("@sentry/node");
const error_handlers = require('./Utils/Errors/error_handlers');
const app = express()


app.use(helmet())
app.use(cors())
app.use(bodyparser.json())

connectDb();

const limiter = ratelimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
})

app.use(limiter)

//route 
app.use('/user', user)


//sentry error handle setup
Sentry.setupExpressErrorHandler(app);

//gobal error handling with sentry 
error_handlers(app);


//server setup
app.listen(process.env.port || '3002', () => {
    try {
        console.log(`Server connected Successfully to port ${process.env.port}`);
    } catch (err) {
        console.log("Internal error :", err);
    }
})