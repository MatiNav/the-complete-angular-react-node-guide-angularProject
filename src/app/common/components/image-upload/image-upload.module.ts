import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { ImageUploadService } from '../image-upload/image-upload.service';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  exports:[
    ImageUploadComponent
  ],
  providers:[ImageUploadService],
  declarations:[ImageUploadComponent],
})
export class ImageUploadModule { }
