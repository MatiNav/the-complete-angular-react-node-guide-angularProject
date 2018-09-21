import { Booking } from 'src/app/booking/model/booking.model';
import { Injectable } from '@angular/core';
import * as moment from 'moment'


@Injectable()
export class HelperService{

    /**
     * Devuelve el rango de fechas
     * @param startAt 
     * @param endAt 
     */
    private getRangedDates(startAt, endAt, format){
        const tempDates = []
        const mEndAt = moment(endAt)
        let mStartAt = moment(startAt)

        while (mStartAt < mEndAt) {
            tempDates.push(mStartAt.format(format))
            mStartAt = mStartAt.add(1, 'day')
        }

        tempDates.push(moment(startAt).format(format))
        tempDates.push(mEndAt.format(format))

        return tempDates
    }

    private formatDate(date, dateFormat){
        return moment(date).format(dateFormat)
    }

    getBookingRangedDates(startAt, endAt){
      return this.getRangedDates(startAt, endAt, Booking.DATE_FORMAT)
    }

    getBookingDateFormat(date){
        return this.formatDate(date, Booking.DATE_FORMAT)
    }



}