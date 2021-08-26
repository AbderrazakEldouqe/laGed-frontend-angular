import { IFile } from 'src/app/_core/models/i-file';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  /**
   * uploadMultipleFiles
   * *
   */
  uploadMultipleFiles(event: any): IFile[] {
    let files = event.target.files;
    let AllFiles: IFile[] = [];
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onloadend = (e: any) => {
          AllFiles.push({
            fileName: file.name,
            fileBase64: e.target.result, //Base64 string for preview image
          });
          //this.filesStudentUploadedEventEmitter();
          console.log('files', AllFiles);
        };
        reader.readAsDataURL(file);
      }
    }
    return AllFiles;
  }

  /**
   * fileListToBase64
   * * array with base64 strings
   */
  async fileListToBase64(fileList: any): Promise<IFile[]> {
    // here will be array of promisified functions
    const promises = [];

    // loop through fileList with for loop
    for (let i = 0; i < fileList.length; i++) {
      promises.push(this.getBase64(fileList[i]));
    }
    // array with base64 strings
    return await Promise.all(promises);
  }

  /**
   * fileListToBase64
   * *create function which return resolved promise
   * *with data:base64 string
   */
  getBase64(file: any): Promise<IFile> {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.readAsDataURL(file);
      reader.onload = (ev: any) => {
        resolve({
          fileName: file.name,
          fileBase64: ev.target.result, //Base64 string for preview image
        });
      };
    });
  }
}
