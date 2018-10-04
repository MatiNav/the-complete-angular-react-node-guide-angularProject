import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { NgPipesModule } from 'ngx-pipes';
import { UppercasePipe } from 'src/app/common/pipes/uppercase.pipe';
import { MapModule } from 'src/app/common/map/map.module';
import { RentalRoutingModule } from 'src/app/rental/rental-routing.module';
import { RentailDetailBookingComponent } from './rental-detail/rentail-detail-booking/rentail-detail-booking.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { BookingRoutingModule } from 'src/app/booking/booking-routing.module';
import { FormsModule } from '@angular/forms';
import { BookingService } from 'src/app/booking/shared/booking.service';
import { RentalSearchComponent } from 'src/app/rental/rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';
import { RentalEditComponent } from './rental-edit/rental-edit.component';
import { RentalService } from 'src/app/rental/shared/services/rental.service';
import { RentalStoreService } from 'src/app/rental/shared/services/rental.store.service';
import { RouterStateSnapshot } from '@angular/router';
import { EditGuard } from 'src/app/rental/shared/guards/edit.guard';
import { ImageUploadModule } from '../common/components/image-upload/image-upload.module';


@NgModule({
    declarations: [
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent,
        UppercasePipe,
        RentailDetailBookingComponent,
        RentalSearchComponent,
        RentalCreateComponent,
        RentalEditComponent
    ],
    imports: [
        CommonModule,
        NgPipesModule,
        MapModule,
        RentalRoutingModule,
        Daterangepicker,
        BookingRoutingModule,
        ImageUploadModule,
        FormsModule
    ],
    providers: [
        RentalService,
        RentalStoreService,
        BookingService,
        EditGuard
    ]
})
export class RentalModule { }