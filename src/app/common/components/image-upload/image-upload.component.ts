import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from 'src/app/common/components/image-upload/image-upload.service';

class FileSnippet {

  static readonly IMG_SIZE = {width: 720, heigth: 420}

  pending: boolean = false
  status: string = 'INIT'

  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  selectedFile: FileSnippet
  imageChangedEvent: any

  constructor(private imgUploadSrvc: ImageUploadService) { }

  ngOnInit() {
  }

  onProcessFile(event: any) {
    this.selectedFile = undefined
    const URL = window.URL
    let file, img;

    if((file = event.target.files[0]) && (file.type === 'image/png' || file.type === 'image/jpeg')){
      img = new Image()
    
      const self = this;
      img.onload = function () {
        
        if(this.width < FileSnippet.IMG_SIZE.width && this.height < FileSnippet.IMG_SIZE.heigth){
          self.imageChangedEvent = event
        } else {
          //Handle Error
        }

      }
      img.src = URL.createObjectURL(file)
    } else {
          //Handle Error
    }

  }

  imageCropped(file: File) {
    if (this.selectedFile) {
      this.selectedFile.file = file
    }

    return this.selectedFile =  new FileSnippet('', file)
  }

  onUploadImage() {
    if (this.selectedFile) {
      const reader = new FileReader()

      reader.addEventListener('load', (event: any) => {
        this.selectedFile.src = event.target.result
        this.selectedFile.pending = true;
        this.imgUploadSrvc.uploadImage(this.selectedFile.file)
          .subscribe(
          res => {
            this.selectedFile.pending = false;
            this.imageChangedEvent = null
            this.selectedFile.status = 'OK';
          },
          error => {
            this.selectedFile.pending = false;
            this.imageChangedEvent = null
            this.selectedFile.status = 'FAIL'
          })

      })

      reader.readAsDataURL(this.selectedFile.file)
    }
  }

}
