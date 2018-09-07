const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/dev')
const Rental = require('./model/rental')
const FakeDb = require('./fake-db')
const rentalRoutes = require('./routes/rentals')


mongoose
.connect(config.DB_URL, { useNewUrlParser: true })
.then((res)=>{
    const fakeDb = new FakeDb()
    fakeDb.seedDb()
})

const app = express()

app.use('/api/v1/rentals', rentalRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>console.log('I am running'))