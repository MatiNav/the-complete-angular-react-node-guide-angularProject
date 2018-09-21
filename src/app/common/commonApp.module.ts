import { NgModule } from '@angular/core';


import { HelperService } from "src/app/common/services/helper.service";
import { SessionService } from "src/app/common/services/session.service";
import { SessionStorageService } from "src/app/common/services/session.storage.service";
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports:[
    CommonModule,
  ],
  providers: [
      HelperService,
      SessionService,
      SessionStorageService
  ],
  exports:[
    HeaderComponent
  ]
})
export class CommonAppModule { }
