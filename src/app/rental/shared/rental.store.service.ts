import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Injectable()
export class RentalStoreService {
  private destroy$ = new Subject()
  private rentalsStore = new BehaviorSubject<any[]>([])
  private rentalsObservable = this.rentalsStore.asObservable()
    

  constructor() {
    
  }

  private ngOnDestroy(){
    this.destroy$.next(true)
  }


  getRentals(): Observable<any[]>{
    return this.rentalsObservable
  }

  setRentals(rentals){
    this.rentalsStore.next(rentals)
  }
}
