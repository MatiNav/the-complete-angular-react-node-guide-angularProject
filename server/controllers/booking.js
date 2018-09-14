const MongooseHelpers = require('../helpers/mongoose')
const Booking = require('../model/booking')
const Rental = require('../model/rental')
const User = require('../model/user')
const moment = require('moment-mini-ts')


exports.createBooking = function (req, res) {
    const { startAt, endAt, totalPrice, guests, days, rental } = req.body
    const user = res.locals.user

    const booking = new Booking({
        startAt,
        endAt,
        totalPrice,
        guests,
        days,
        rental
    })

    Rental.findById(rental._id)
        .populate('bookings')
        .populate('user')
        .exec(function (err, foundRental) {
            if (err) {
                return res.status(422).send(MongooseHelpers.normalizeErrors(err.errors))
            }

            if (foundRental.user.id == user.id) {
                return res.status(422).send({ errors: [{ title: 'Wait !!', description: 'It seems that your are making a booking to one of yours rentals.' }] })
            }

            if (isValidBooking(booking, foundRental)) {
                booking.user = user
                booking.rental = foundRental
                foundRental.bookings.push(booking)

                booking.save(function (err) {
                    if (err) {
                        res.status(422).send({ errors: [{ title: 'Rental Error!', detail: 'Could not find Rental!' }] })
                    }
                })

                // hace el update para no pasar por el pre-save y no generar un nuevo token a traves de la pass
                User.update({ _id: user.id }, { $push: { bookings: booking } }, function (err) {
                    if (err) {
                        res.status(422).send({ errors: [{ title: 'Rental Error!', detail: 'Could not find Rental!' }] })
                    }
                })

                foundRental.save(function (err) {
                    if (err) {
                        res.status(422).send({ errors: [{ title: 'Rental Error!', detail: 'Could not find Rental!' }] })
                    }
                })

                return res.json({ startAt: booking.startAt, endAt: booking.endAt })
            } else {
                return res.status(422).send({ errors: [{ title: 'Invalid Booking !!', description: 'Choosen date is already taken.' }] })
            }

        })


}

function isValidBooking(proposedBooking, rental) {
    let isValid = true
    let flag = true
    if (rental.bookings) {
        if (rental.bookings.length > 0) {
            isValid = rental.bookings.every(function (savedBooking) {
                const proposedBookingStartDate = moment(proposedBooking.startAt)
                const proposedBookingEndDate = moment(proposedBooking.endAt)

                const savedBookingStartDate = moment(savedBooking.startAt)
                const savedBookingEndDate = moment(savedBooking.endAt)

                return ((savedBookingStartDate < proposedBookingStartDate && savedBookingEndDate < proposedBookingStartDate) ||
                    (proposedBookingEndDate < savedBookingEndDate && proposedBookingEndDate < savedBookingStartDate))
            })
            return isValid
        } else {
            return isValid
        }
    }

}
