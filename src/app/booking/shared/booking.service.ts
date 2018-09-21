import { Observable } from 'rxjs/internal/Observable';
import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Injectable()
export class BookingService {

    constructor(private http:HttpClient){}

    makePostToCreateBooking(booking){
        return new Observable<any>((observer) => {

            this.http.post('/api/v1/bookings', booking)
                .subscribe(
                data => {
                    observer.next(data)
                    observer.complete()
                },
                (error: HttpErrorResponse) => {
                    observer.error(error)
                    observer.complete()
                }
                )
        })
    }

}