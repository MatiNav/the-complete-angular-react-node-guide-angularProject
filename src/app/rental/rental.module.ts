import { rentalRouterConfig } from './rental.router.config';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';


@NgModule({
    declarations:[
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(rentalRouterConfig)
    ]
})
export class RentalModule {}