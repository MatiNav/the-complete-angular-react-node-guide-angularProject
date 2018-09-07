import { Routes } from '@angular/router';
import { RentalComponent } from 'src/app/rental/rental.component';


export const routerConfig: Routes = [
    {path: '', redirectTo: 'rentals', pathMatch:'full'},

]