import { HttpErrorResponse } from '@angular/common/http/src/response';
import { RentalStoreService } from '../services/rental.store.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RentalService {
  private destroy$ = new Subject()
    

  constructor(private http:HttpClient, private rentalStoreSrvc:RentalStoreService) {
    
  }

  ngOnDestroy(){
    this.destroy$.next(true)
  }

  getRentalsById(id): Observable<any>{
    return new Observable<any>((observer)=>{

      this.http.get('/api/v1/rentals/' + id)
      .subscribe(
        data=>{
          observer.next(data)
          observer.complete()

        },
        (error: HttpErrorResponse) =>{
          observer.error(error.message) 
          observer.complete()
         
        }
      )
    })
  }

  getRentalsByCity(city): Observable<any>{
    return new Observable<any>((observer)=>{

      this.http.get(`/api/v1/rentals?city=${city}`)
      .subscribe(
        data=>{
          observer.next(data)
          observer.complete()

        },
        (error: HttpErrorResponse) =>{
          observer.error(error.message) 
          observer.complete()
         
        }
      )
    })
  }

  getRentals(): Observable<any>{
    return new Observable<any>((observer)=>{

      this.http.get('/api/v1/rentals')
      .subscribe(
        data=>{
          this.rentalStoreSrvc.setRentals(data)
          observer.next('ok')
        },
        (error: HttpErrorResponse) =>{
          observer.error(error.message)          
        }
      )
    })
  }


  /**
     * Verifica el usuario 
     * @param rentalId 
     */
    verifyUser(rentalId){
      return this.http.get(`/api/v1/rentals/${rentalId}/user-verify`)
  }


}
