
import { Component, OnInit } from '@angular/core';
import { RentalService } from 'src/app/rental/shared/rental.service';
import { RentalStoreService } from 'src/app/rental/shared/rental.store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.css']
})
export class RentalSearchComponent implements OnInit {
    public rentals
    public city

  constructor(
      private rentalSrvc: RentalService, private rentalStoreSrvc: RentalStoreService,
    private route: ActivatedRoute
) {}

  ngOnInit() {
      this.getParams()
  }

  private getParams(){
      this.route.params.subscribe(params=>{
          this.city = params['city']
      })
      this.rentalSrvc.getRentalsByCity(this.city)
      .subscribe(res=>{
        this.rentals = res
      },
      err=>alert(err)
    )
  }

}
