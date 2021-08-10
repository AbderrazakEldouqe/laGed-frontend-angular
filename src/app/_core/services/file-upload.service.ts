import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JsService {
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
