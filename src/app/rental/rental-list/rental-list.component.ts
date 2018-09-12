import { RentalStoreService } from './../shared/rental.store.service';
import { Rental } from 'src/app/rental/shared/rental.model';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { RentalService } from 'src/app/rental/shared/rental.service';
import {takeUntil} from 'rxjs/operators'
import { Subject } from 'rxjs/internal/Subject';


@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit, OnDestroy {
  rentals

  constructor(public rentalStoreSrvc:RentalStoreService) { }

  ngOnInit() {
    this.subscribeToRentals()
  }

  ngOnDestroy(){
  }


  subscribeToRentals(){
    this.rentalStoreSrvc.getRentals()
    .subscribe((rentals: any[])=>{
      if(rentals.length > 0){
      console.log(rentals)
      this.rentals = rentals
    }
    })
  }

}
