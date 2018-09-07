import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Rental } from 'src/app/rental/shared/rental.model';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Injectable()
export class RentalService {
  private destroy$ = new Subject()
  private rentalsStore = new BehaviorSubject<Rental[]>([new Rental()])
  private rentalsObservable = this.rentalsStore.asObservable()
    

  constructor() {
    
  }

  ngOnDestroy(){
    this.destroy$.next(true)
  }


  getRentals(): Observable<Rental[]>{
    return this.rentalsObservable
  }

  getRentalsById(id): Observable<Rental>{
    return new Observable<Rental>((observer)=>{
      var destroy$ = new Subject()
      this.rentalsObservable
      .pipe(
        takeUntil(destroy$)
      )
      .subscribe(rentals=>{
        observer.next(rentals.find((r)=> r.id == id))
        destroy$.next(true)
      })
    })
  }


  setRentals(rentals){
    this.rentalsStore.next(rentals)
  }
}
