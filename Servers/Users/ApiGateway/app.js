const express = require('express');
const app = express();
const proxy = require('express-http-proxy');
const cors = require('cors')

app.use(express.json());

app.use(cors());

//proxy server config
app.use('/customer', proxy('http://localhost:3001')); // customer
app.use('/products', proxy('http://localhost:3002')); //products
app.use('/shopping', proxy('http://localhost:3003')); //shopping


// server created
app.listen(3000, () => {
    try {
        console.log('Api gateway server started successfully');
    } catch (error) {
        console.error('Server Error', error);

    }


})