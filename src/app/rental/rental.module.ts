import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalService } from 'src/app/rental/shared/rental.service';
import { RentalStoreService } from 'src/app/rental/shared/rental.store.service';
import { NgPipesModule } from 'ngx-pipes';
import { UppercasePipe } from 'src/app/common/pipes/uppercase.pipe';
import { MapModule } from 'src/app/common/map/map.module';
import { RentalRoutingModule } from 'src/app/rental/rental-routing.module';
import { RentailDetailBookingComponent } from './rental-detail/rentail-detail-booking/rentail-detail-booking.component';
import { Daterangepicker } from 'ng2-daterangepicker';


@NgModule({
    declarations: [
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent,
        UppercasePipe,
        RentailDetailBookingComponent
    ],
    imports: [
        CommonModule,
        NgPipesModule,
        MapModule,
        RentalRoutingModule,
        Daterangepicker
    ],
    providers: [
        RentalService,
        RentalStoreService,

    ]
})
export class RentalModule { }