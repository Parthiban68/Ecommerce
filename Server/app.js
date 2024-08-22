const express = require('express');
require('dotenv').config()
const bodyparser = require('body-parser')
const cors = require('cors')
const {connectDb, sequelize} = require('./Config/mysqlDb')
const { Sequelize } = require('sequelize');
const ratelimit = require('express-rate-limit')
const helmet = require('helmet')
const app = express()


app.use(helmet())
app.use(cors())
app.use(bodyparser.json())

connectDb();

const limiter = ratelimit({
    windowMs : 15 * 60 * 1000,
    max: 100,
})

app.use(limiter)

app.get('/user', (req, res) => {
    const users = sequelize.query('SELECT * FROM sakila.actor', { type: Sequelize.QueryTypes.SELECT })
    .then(users => {
        res.status(200).json({message:"data added",users});
      })
      .catch(err => {
        return res.status(500).json({message:'Server error',err});    
      });
             
})


app.listen(process.env.port || '3002', () => {
    try {
        console.log(`Server connected Successfully to port ${process.env.port}`);
    } catch (err) {
        console.log("Internal error :", err);
    }
})