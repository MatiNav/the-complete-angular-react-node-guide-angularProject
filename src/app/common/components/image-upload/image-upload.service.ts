import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ImageUploadService {

  constructor(private http:HttpClient) { }

  public uploadImage(image:File): Observable<any>{
    let formData: FormData = new FormData();

    formData.append('image',image);

    return this.http.post('/api/v1/image-upload',formData)
  }
}
