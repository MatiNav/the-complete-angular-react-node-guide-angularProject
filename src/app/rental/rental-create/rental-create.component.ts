import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/rental/model/rental.model';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

  newRental

  constructor() { }

  ngOnInit() {
    this.newRental = new Rental()
  }

  onCreate(){
    console.log(this.newRental)
  }

}
