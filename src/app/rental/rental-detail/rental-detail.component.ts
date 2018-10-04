import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/services/rental.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {


  destroy$ = new Subject()
rental 
  constructor(private route: ActivatedRoute, private rentalSrvc: RentalService) { }

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    )
      .subscribe(params => {
        console.log(params['rentalId'])
        this.getRentalById(params['rentalId'])
      })
  }


  /**
   * Obtiene una renta a traves de una id
   * @param id 
   */
  getRentalById(id) {
    this.rentalSrvc.getRentalsById(id)
      .pipe(
      takeUntil(this.destroy$)
      )
      .subscribe(
      rental => {
        console.log(rental)
        this.rental = rental
      },
      (error: HttpErrorResponse) => {
        alert(error)
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }

}
