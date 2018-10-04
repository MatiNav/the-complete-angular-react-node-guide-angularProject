import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, pipe, of } from 'rxjs';
import { RentalService } from 'src/app/rental/shared/services/rental.service';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';


@Injectable()
export class EditGuard implements CanActivate {
  private url: string;

  constructor(public rentalSrvc: RentalService, public router:Router){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.rentalSrvc.verifyUser(next.params['rentalId']).pipe(
        map(() => {
          console.log('true')
          return true
        }),
        catchError(() => {
          console.log('false')
          this.router.navigate(['/rental']);
          return of(false);
        })
      )
  }
}
