const express = require("express");
const app = express();
const cors = require('cors');
const bodypraser = require('body-parser');

app.use(cors());

app.use(bodypraser.json());

app.get('/',(req,res)=>{
    return res.status(200).json({message:'Shopping page'});
});

app.listen('3003',()=>{
    try {
        console.log("Shopping server Running Successfully");
    } catch (error) {
        console.error('Server Error',error);
        
    }
})