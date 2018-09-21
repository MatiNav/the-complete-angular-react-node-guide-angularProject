const Rental = require('../model/rental')
const User = require('../model/user')
const MongooseHelpers = require('../helpers/mongoose')


exports.getRentals = function(req, res) {
    const city = req.query.city
    const query = city ? {city} : {}

        Rental.find(query)
            .select('-bookings')//cuando hace el find (no findById), es select, y aca va a traer todo menos los bookings, si le agrego uno
            // por ejemplo ('city') ahi ya me trae especificamente ese. Un dato, no puede tener - y + en el mismo.. (city -bookings)
            .exec(function (err, foundRentals) {
                if (err) {
                    return res.status(422).send(MongooseHelpers.normalizeErrors(err.errors))
                }

                if (!foundRentals.length > 0 && city) {
                    return res.status(422).send({ errors: [{ title: 'Ups !!', description: 'We have no city with name ' + city }] })
                } else if (!foundRentals.length > 0 && !city) {
                    return res.status(422).send({ errors: [{ title: 'Ups !!', description: 'We have no rentals !! '}] })
                }

                return res.json(foundRentals)
            })

}


exports.getRentalsById = function (req, res) {
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
            return res.json(foundRental)
        })
}


exports.getRentalsOfUser = function (req, res) {
    const user = res.locals.user


    Rental.where({user})
    .populate('bookings')
    .exec(function (err, rentalsFound) {
        if (err) {
            return res.status(422).send(MongooseHelpers.normalizeErrors(err.errors))
        }

        return res.json(rentalsFound)
    })
}


exports.createRental = function (req, res) {
    const {title, city, street, category, image, shared, bedrooms, description, dailyRate } = req.body
    const rental = new Rental({title, city, street, category, image, shared, bedrooms, description, dailyRate })
    const user = res.locals.user
    rental.user = user
    
    Rental.create(rental, function(err, rental){
        if (err) {
            return res.status(422).send(MongooseHelpers.normalizeErrors(err.errors))
        }
    })

    User.update({_id: user.id}, {$push: {rentals: rental}}, function(err, rental){
        if (err) {
            return res.status(422).send(MongooseHelpers.normalizeErrors(err.errors))
        }
    })

    res.json(rental)    
}


exports.deleteRental =  function (req, res) {
    const user = res.locals.user

    Rental.findById(req.params.id)
        .populate('user', '_id')
        .populate({
            path: 'bookings',
            select: 'startAt',
            match:{startAt:{ $gt: new Date()}}
        })
        .exec(function (err, foundRental){

            if(!foundRental){
                return res.status(422).send({ errors: [{ title: 'Wait !!', description: 'This rental doesnt exist.' }] })                
            }

            if (err) {
                return res.status(422).send(MongooseHelpers.normalizeErrors(err.errors))
            }

            if(user.id !== foundRental.user.id){
                    return res.status(422).send({ errors: [{ title: 'Wait !!', description: 'This rental doesnt belong to you.' }] })
            }

            if(foundRental.bookings.length > 0){
                    return res.status(422).send({ errors: [{ title: 'Wait !!', description: 'This rental has active bookings.' }] })
            }

            foundRental.remove(function(err){
                if (err) {
                    return res.status(422).send(MongooseHelpers.normalizeErrors(err.errors))
                }

                res.json({status:'deleted'})
            })

        })
}