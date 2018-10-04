const express = require('express')
const router = express.Router()
const Rental = require('../model/rental')
const UserCtrl = require('../controllers/user')
const RentalsCtrl = require('../controllers/rentals')
const MongooseHelpers = require('../helpers/mongoose')

router.patch('/:id', UserCtrl.authMiddleware, RentalsCtrl.editRental)

router.get('/secret', UserCtrl.authMiddleware, (req, res) => {
    res.json({ secret: true })
})

router.get('/manage',UserCtrl.authMiddleware, RentalsCtrl.getRentalsOfUser)

router.get('/:id/user-verify',UserCtrl.authMiddleware, RentalsCtrl.verifyUser)

router.get('/:id', RentalsCtrl.getRentalsById)

router.get('', RentalsCtrl.getRentals)

router.post('',UserCtrl.authMiddleware, RentalsCtrl.createRental)

router.delete('/:id', UserCtrl.authMiddleware, RentalsCtrl.deleteRental)


module.exports = router