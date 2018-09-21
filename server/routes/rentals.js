const express = require('express')
const router = express.Router()
const Rental = require('../model/rental')
const UserCtrl = require('../controllers/user')
const RentalsCtrl = require('../controllers/rentals')
const MongooseHelpers = require('../helpers/mongoose')

router.get('/secret', UserCtrl.authMiddlewate, (req, res) => {
    res.json({ secret: true })
})

router.get('/manage',UserCtrl.authMiddlewate, RentalsCtrl.getRentalsOfUser)

router.get('/:id', RentalsCtrl.getRentalsById)



router.get('', RentalsCtrl.getRentals)

router.post('',UserCtrl.authMiddlewate, RentalsCtrl.createRental)

router.delete('/:id', UserCtrl.authMiddlewate, RentalsCtrl.deleteRental)


module.exports = router