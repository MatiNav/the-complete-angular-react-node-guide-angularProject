import { Component, OnInit, OnDestroy } from '@angular/core';
import {takeUntil} from 'rxjs/operators'
import { Subject } from 'rxjs/internal/Subject';
import { RentalStoreService } from 'src/app/rental/shared/services/rental.store.service';


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
