import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from 'src/app/rental/shared/rental.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {
  destroy$ = new Subject()
  rental

  constructor(private route: ActivatedRoute, private rentalSrvc:RentalService) { }

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(params => {
      this.getRentalById(params['rentalId'])
    })
  }


  /**
   * Obtiene una renta a traves de una id
   * @param id 
   */
  getRentalById(id){
    this.rentalSrvc.getRentalsById(id)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(rental=>{
        this.rental = rental
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }

}
