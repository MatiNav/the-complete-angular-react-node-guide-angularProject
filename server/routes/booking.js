const express = require('express')
const router = express.Router()
const Rental = require('../model/rental')
const BookingCtrl = require('../controllers/booking')
const UserCtrl = require('../controllers/user')

router.post('', UserCtrl.authMiddleware, BookingCtrl.createBooking)
router.get('/manage', UserCtrl.authMiddleware, BookingCtrl.getBookingsOfUser)

module.exports = router