import { Booking } from 'src/app/booking/model/booking.model';
import { Rental } from 'src/app/rental/model/rental.model';
import { Component, OnInit, Input } from '@angular/core';
import { HelperService } from 'src/app/common/services/helper.service';
import * as moment from 'moment'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/booking/shared/booking.service';

@Component({
  selector: 'app-rentail-detail-booking',
  templateUrl: './rentail-detail-booking.component.html',
  styleUrls: ['./rentail-detail-booking.component.scss']
})
export class RentailDetailBookingComponent implements OnInit {
  @Input() rental: Rental

   daterange: any = {};
   bookedOutDates = []
   newBooking: Booking
   modalRef
   errors = []

  public options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  constructor(
    public helperSrvc: HelperService, private modalSrvc: NgbModal, private bookingSrvc: BookingService
  ) { }

  ngOnInit() {
    this.getBookedOutDates()
    this.newBooking = new Booking()
    this.newBooking.rental = this.rental
  }

  private getBookedOutDates() {
    const bookings = this.rental.bookings

    if (bookings) {
      if (bookings.length > 0) {
        bookings.forEach(b => {
          this.addBookedDates(b)
        })
      }
    }
  }

  private addBookedDates(booking){
    const dateRange = this.helperSrvc.getBookingRangedDates(booking.startAt, booking.endAt)
    this.bookedOutDates.push(...dateRange)
  }


  private checkForInvalidDates(date) {
    return (this.bookedOutDates.includes(date.format(Booking.DATE_FORMAT)) || date.diff(moment(), 'days') < 0)
  }

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers

  public selectedDate(value: any, datepicker?: any) {
    // this is the date the iser selected

    // any object can be passed to the selected event and it will be passed back here
    this.newBooking.startAt = this.helperSrvc.getBookingDateFormat(value.start)
    this.newBooking.endAt = this.helperSrvc.getBookingDateFormat(value.end)
    this.newBooking.days = -(value.start.diff(value.end, 'days'))
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate
    console.log(this.newBooking)

  }


  public openConfirmRental(content) {
    this.errors = []
    this.modalRef = this.modalSrvc.open(content)
  }

  private createBooking() {
    this.bookingSrvc.makePostToCreateBooking(this.newBooking)
      .subscribe(
      res => {
        this.newBooking = new Booking()
        this.addBookedDates(res)
        this.modalRef.close()
      },
      err => {
        this.errors = err.error.errors
       }

      )
  }

}
