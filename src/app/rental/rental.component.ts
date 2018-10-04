import { Component, OnInit } from '@angular/core';
import { RentalStoreService } from 'src/app/rental/shared/services/rental.store.service';
import { RentalService } from 'src/app/rental/shared/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {



  constructor(private rentalSrvc: RentalService, private rentalStoreSrvc: RentalStoreService) {
    this.rentalSrvc.getRentals()
    .subscribe(
      data=>{
        console.log(data)},
      error=>console.log(error)
    )
   }

  ngOnInit() {
  }

}
