import { rentalRouterConfig } from './rental.router.config';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalService } from 'src/app/rental/shared/rental.service';
import { RentalStoreService } from 'src/app/rental/shared/rental.store.service';
import {NgPipesModule} from 'ngx-pipes';
import { UppercasePipe } from 'src/app/common/pipes/uppercase.pipe';
import { MapModule } from 'src/app/common/map/map.module';


@NgModule({
    declarations:[
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent,
        UppercasePipe
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(rentalRouterConfig),
        NgPipesModule,
        MapModule        
    ],
    providers: [ 
        RentalService,
        RentalStoreService
    ]
})
export class RentalModule {}