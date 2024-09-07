const express = require('express');
const app = express();
const proxy = require('express-http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const cors = require('cors')
const helmet = require('helmet');
require('dotenv').config();
const Sentry = require('@sentry/node');
const gobal_errors = require('./Errors_handler/gobal_errors');

app.use(express.json());

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})

const proxyConfig = {
    target: "",
    changeOrigin: true,
    onError: (error, req, res, next) => {
        console.error('proxy error', error);
        next(error)
    },
}

const customerUrl = process.env.customer_url || 'http://localhost:3001';
const productUrl = process.env.product_url || 'http://localhost:3002';
const shoppingUrl = process.env.shopping_url || 'http://localhost:3003';

//proxy server config

app.use('/customer', limiter, createProxyMiddleware({
    ...proxyConfig,
    target: customerUrl
})); // customer

app.use('/product', limiter, createProxyMiddleware({
    ...proxyConfig,
    target: productUrl,
})); //products

app.use('/shopping', limiter, createProxyMiddleware({
    ...proxyConfig,
    target: shoppingUrl,
})); //shopping


//sentry config
Sentry.init();
Sentry.setupExpressErrorHandler(app);


//Gobal error handling for api gate way
gobal_errors(app);


//dotenv port num assign to variable
const port = process.env.port || 3000;

// server created
app.listen(port, () => {
    try {
        console.log(`Api gateway server started successfully on port ${port}`);
    } catch (error) {
        next(error);
    }


})