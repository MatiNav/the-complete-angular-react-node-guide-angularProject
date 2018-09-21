const User = require('../model/user')
const MongooseHelpers = require('../helpers/mongoose')
const jwt = require('jsonwebtoken')
const config = require('../config')


exports.auth = function (req, res) {

    const { email, password } = req.body

    if (!password || !email) {
        return res.status(422).send({ errors: [{ title: 'Data missing!', description: 'Password and email are required' }] })
    }

    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(422).send(MongooseHelpers.normalizeErrors(err.errors))
        }

        if (!user) {
            return res.status(422).send({ errors: [{ title: 'Invalid User!', description: 'User does not exist' }] })
        }

        if (user.hasSamePassword(password)) {
            const token = jwt.sign({
                userId: user._id, 
                username: user.username
            }, config.SECRET, { expiresIn: '1h' })
            return res.json(token)
        } else {
            return res.status(422).send({ errors: [{ title: 'Invalid User or Password!', description: 'User or Password do not exist' }] })
        }

    })

}



exports.register = function (req, res) {
    // const username = req.body.username
    // const email = req.body.email
    // const password = req.body.password
    // const passwordConfirmation = req.body.passwordConfirmation

    // lo de arriba es lo mismo que:

    const { username, email, password, passwordConfirmation } = req.body

    if (!password || !email) {
        return res.status(422).send({ errors: [{ title: 'Data missing!', description: 'Password and email are required' }] })
    }
    if (password !== passwordConfirmation) {
        return res.status(422).send({ errors: [{ title: 'Password error!', description: 'Password and Confirmation Password are not the same' }] })
    }
    /**
     * {email: email}
     * es lo mismo que
     * {email}
     * (aclaracion para linea 32)
     */

    User.findOne({ email }, (err, existingUser) => {
        if (err) {
            return res.status(422).send(MongooseHelpers.normalizeErrors(err.errors))
        }

        if (existingUser) {
            return res.status(422).send({ errors: [{ title: 'User Duplicated!', description: 'There is a user with that email' }] })
        }

        /**
        * {email: email}
        * es lo mismo que
        * {email}
        * (aclaracion para linea 47)
        */
        const user = new User({
            username,
            email,
            password
        })

        user.save((err) => {
            if (err) {
                return res.status(422).send(MongooseHelpers.normalizeErrors(err.errors))
            }
            return res.json({ registered: true })
        })

    })

}


exports.authMiddlewate = function (req, res, next) {
    const token = req.headers.authorization
    let userReceived
    if (token) {
        try {
            userReceived = parseToken(token)
        } catch (error) {
            return res.status(422).send({ errors: [{ title: 'Not authorized!', description: 'invalid signature !!' }] })
        }
        User.findById(userReceived.userId, function (err, user) {
            if (err) {
                return res.status(422).send(MongooseHelpers.normalizeErrors(err.errors))
            }

            if (user) {
                res.locals.user = user
                next()
            } else {
                return res.status(422).send({ errors: [{ title: 'Not authorized!', description: 'Please log in' }] })
            }
        })
    } else {
        return res.status(422).send({ errors: [{ title: 'Not authorized!', description: 'Please log in' }] })
    }


}


function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET)
}