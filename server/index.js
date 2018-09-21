const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const bodyParser = require('body-parser')
const Rental = require('./model/rental')
const FakeDb = require('./fake-db')
const rentalRoutes = require('./routes/rentals')
const userRoutes = require('./routes/users')
const bookingRoutes = require('./routes/booking')
const path = require('path')

mongoose.connect(config.DB_URL, { useNewUrlParser: true })
    .then((res) => {
        const fakeDb = new FakeDb()
         //fakeDb.seedDb()
    })
mongoose.set('useCreateIndex', true);


const app = express()


app.use(bodyParser.json())

app.use('/api/v1/rentals', rentalRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/bookings', bookingRoutes)

const appPath = path.join(__dirname, '..', 'dist/the-complete-angular-react-node-guide')
app.use(express.static(appPath))

app.get('*', function (req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'))
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log('I am running'))