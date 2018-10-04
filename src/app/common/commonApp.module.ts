import { NgModule } from '@angular/core';


import { HelperService } from "src/app/common/services/helper.service";
import { SessionService } from "src/app/common/services/session.service";
import { SessionStorageService } from "src/app/common/services/session.storage.service";
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/app/common/guards/auth-guard.service';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';



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
      SessionStorageService,
      AuthGuard
  ],
  exports:[
    HeaderComponent
  ]
})
export class CommonAppModule { }
