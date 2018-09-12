const Rental = require('./model/rental')
const User = require('./model/user')

class FakeDb {

    constructor() {
        this.rentals = [{
            title: "Central Apartment",
            city: "New York",
            street: "Times Sqaure",
            category: "apartment",
            image: "http://via.placeholder.com/350x250",
            bedrooms: 3,
            description: "Very nice apartment",
            dailyRate: 34,
            shared: false
        },
        {
            title: "Central Apartment 2",
            city: "San Francisco",
            street: "Main street",
            category: "condo",
            image: "http://via.placeholder.com/350x250",
            bedrooms: 2,
            description: "Very nice apartment",
            dailyRate: 12,
            shared: false
        },
        {
            title: "Central Apartment 3",
            city: "Bratislava",
            street: "Hlavna",
            category: "condo",
            image: "http://via.placeholder.com/350x250",
            bedrooms: 2,
            description: "Very nice apartment",
            dailyRate: 334,
            shared: true
        },
        {
            title: "Central Apartment 4",
            city: "Berlin",
            street: "Haupt strasse",
            category: "house",
            image: "http://via.placeholder.com/350x250",
            bedrooms: 9,
            description: "Very nice apartment",
            dailyRate: 33,
            shared: true
        }]

        this.users = [{
            username: 'Test user',
            email: 'test@gmail.com',
            password: 'testtest'
        }]
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