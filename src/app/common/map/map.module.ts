import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from 'src/app/common/map/map.component';
import { MapService } from 'src/app/common/map/map.service';
import { CamelizePipe } from 'ngx-pipes';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    MapComponent,
  ],
  exports: [
    MapComponent
  ],
  imports: [
    CommonModule,      
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyB3f5ek8BdIxWey2fF7n_XfEiGBs8oGjCY'
      })
  ],
  providers: [
      MapService,
    CamelizePipe
      
    ],
})
export class MapModule { }
