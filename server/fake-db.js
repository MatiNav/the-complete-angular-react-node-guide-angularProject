const Rental = require('./model/rental')
const User = require('./model/user')
const FakeDbDataJson = require('./data.json')

class FakeDb {

    constructor() {
        this.rentals = FakeDbDataJson.rentals
        this.users = FakeDbDataJson.users
    }

    async cleanDb() {
        await User.deleteMany({})
        await Rental.deleteMany({})
    }

    pushDataToDb() {

        const newUser = new User(this.users[0])

        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental)
            newRental.user = newUser
            newUser.rentals.push(newRental)
            newRental.save()
        })

        newUser.save()
    }

    async seedDb() {
        await this.cleanDb()
        this.pushDataToDb()
    }


}

module.exports = FakeDb