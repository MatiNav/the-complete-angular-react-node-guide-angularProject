const Rental = require('./model/rental')

class FakeDb {

    constructor(){
        this.rentals =[{
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
    }

    async cleanDb(){
        await Rental.deleteMany({})
    }

    pushRentalsToDb(){
        this.rentals.forEach((rental)=>{
            const newRental = new Rental(rental)
            newRental.save()
        })
    }

    seedDb(){
        this.cleanDb()
        this.pushRentalsToDb()
    }
    

}

module.exports = FakeDb