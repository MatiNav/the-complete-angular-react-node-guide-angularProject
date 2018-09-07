import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalComponent } from 'src/app/rental/rental.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { Routes } from '@angular/router';


export const rentalRouterConfig: Routes = [
    {path: 'rentals',
     component: RentalComponent,
      children:[
        {path: '', component: RentalListComponent},
        {path: ':rentalId', component: RentalDetailComponent}
      ]},

]