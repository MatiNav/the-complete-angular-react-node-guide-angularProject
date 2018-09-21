import { Booking } from "src/app/booking/model/booking.model";

export class Rental{
    _id: string
    title: string
    city: string
    street: string
    category: string
    image: string
    bedrooms: number
    description: string
    dailyRate: number
    shared: boolean
    createdAt: number
    bookings: Booking[]
}