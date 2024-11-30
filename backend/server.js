const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs') 
const cors = require('cors')
dotenv.config()
const formRoutes = require('./routes/formRoutes')

const app = express()
const port = process.env.Port || 3003

app.use(cors()) 

app.use((req, res, next) => {
    const log = `${req.method} - ${req.url} - ${req.ip} - ${new Date()}`
    fs.appendFile('log.txt', log, (err) => {
        if(err){
            console.log(err)
        }
    })
    next()
})

app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send('Hello User Welcome to Form Builder')
})

app.use('/api/form', formRoutes)

app.use((err, req, res, next) => {
    let log = err.stack
    log += `/n${req.method} - ${req.url} - ${req.ip} - ${new Date()}`
    fs.appendFile('error.txt', log, (err) => {
        if(err){
            console.log(err)
        }
    })
    res.status(500).send("Something went wrong")
})

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on('connected', () => {
    console.log('MongoDb is connected...')
})

app.listen(port, () => {
    console.log(`Server is running on ${port} port number`)
})