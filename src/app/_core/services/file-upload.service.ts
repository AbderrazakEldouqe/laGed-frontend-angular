import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      return reader.result;
    };
  }
}
