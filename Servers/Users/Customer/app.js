const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodypraser = require('body-parser');
const Sentry = require('@sentry/node');
const global_error_handler = require("./Utils/Error Handler/global_error_handler");


app.use(cors());

app.use(bodypraser.json());

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'customer page' });
});

//sentry config
Sentry.init();
Sentry.setupExpressErrorHandler(app);

//Gobal error handling for customer
global_error_handler(app);

const port = process.env.port || 3001;

app.listen(port, () => {
    try {
        console.log("Customer server Running Successfully");
    } catch (error) {
        console.error('Server Error', error);
        next(error);
    }
})