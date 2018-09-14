const express = require('express')
const router = express.Router()
const Rental = require('../model/rental')
const UserCtrl = require('../controllers/user')
const MongooseHelpers = require('../helpers/mongoose')

router.get('/secret', UserCtrl.authMiddlewate, (req, res) => {
    res.json({ secret: true })
})

router.get('', (req, res) => {
    Rental.find({})
        .select('-bookings')//cuando hace el find general, es select, y aca va a traer todo menos los bookings, si le agrego uno
        // por ejemplo ('city') ahi ya me trae especificamente ese. Un dato, no puede tener - y + en el mismo.. (city -bookings)
        .exec(function (err, foundRental) {
            if (err) {
                return res.status(422).send(MongooseHelpers.normalizeErrors(err.errors))
            }
            res.json(foundRental)
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id


    Rental.findById(id)
        .populate('user', 'username -_id') // significa que me va a traer el username pero no el id (el id lo trae siempre,
        // por eso se aclara, el password es un campo normal como el username y cuando especifica, por el que no se especifica
        // no se trae)
        .populate('bookings', 'startAt endAt -_id')
        .exec(function (err, foundRental) {
            if (err) {
                return res.status(422).send(MongooseHelpers.normalizeErrors(err.errors))
            }
            res.json(foundRental)
        })
})

module.exports = router